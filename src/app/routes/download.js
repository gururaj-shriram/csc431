/*
  name: download.js
  modified last by: jerry
  date last modified: 18 apr 2018

  Functions as the download REST controller in SAS diagram
  This is our one (and only) route which exposes the endpoint for this server
*/
var express = require('express');
var fileWriter = require('../io/filewriter')
var dataConverter = require('../converter/dataconverter')
var dataManager = require('../db/datamanager')
var bodyParser = require('body-parser');
var cleandir = require('clean-dir');

var router = express.Router();

var pathToTemp = __dirname + '/../temp/';

console.log(fileWriter)
console.log(dataManager)
console.log(dataConverter)
// moves all temporary files created to the trash 
cleandir(pathToTemp, function (err) {});

// package for retrieving data from fields as JSON, as we are to expect
// from the search team 
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/',(req,res) => {
    /* note that req.body receives the field data as JSON, e.g.:
       { construccion: '1 2 3', workshop_20170210: '5', terreno: '3',
      formattype: 'csv', ... }
    */ 

    // if ids are specified for the construccion table, in the example 
    // above this would be '1 2 3' 
    console.log(req.body)
    // list of promises containing each request to getData(); 
    // this holds the results from construccion, terreno, etc. 
    var promiseList = [];
    // a list of keys that runs parallel to the promise list
    // this holds the names like "construccion", "terreno", "workshop"
    var keyList = []; 
    //output format for the data 
    var outFormat = req.body.formattype.trim();


    // get data for all the given references 
    Object.keys(req.body).forEach(function(key) {
        console.log('key : ' + key + ', value: ' + req.body[key]);
        var refs = req.body[key].trim();
        promiseList.push(getData(refs, key));
        keyList.push(key); 
    })

    // Since this is the main body and not in an async function, 
    // we need to do a .then() to wait for the data
    Promise.all(promiseList)
    .then(function(valArray) {
        // try to retrieve data from all tables corresponding to the 
        // given references 
         var data = {
             status: 'success',
             inFormat: 'geojson' // input format of the data
         }
         // valArray[0] is result of promise0
         // valArray[1] is result of promise1, etc.
         for (var i = 0; i < valArray.length; i++) {
            // if getData() did not return undefined, then we received 
            // some data, e.g. the results from construccion table
            if(valArray[i] !== undefined){
                data[keyList[i]] = valArray[i]
             }
         }

        //TODO: need to convert the data to the output format 
        console.log("convert me to " + outFormat);

        // then write the data to a temporary file 
        fileWriter.writeToFile(data,pathToTemp);
        res.status(200).json(data); 
    });
});

// Returns a data promise from db 
async function getData(refs, tableName) {

    if(refs.trim().length > 0){
        // converts the field input "1 2 3" into a comma-delimited string, 
        // i.e., "1, 2, 3". input refs can be delimited by anything, 
        // for instance either "1b2e3" or "1-2-3" works  
        var refsAsList = refs.split(/\D/).
            filter((val) => val).join(',');
        // now fetch data from database for these ids 
        const qString = dataManager.generateQuery(refsAsList,tableName);
        if(qString !== undefined){
            // Since this is called in an async function, data will be properly populated when it is returned.
            var data = await dataManager.fetchFromDb(qString);

            return data; 
        }
    }
    return undefined;
}



module.exports = router;