/*
  name: download.js
  modified last by: guru
  date last modified: 11 apr 2018

  Functions as the download REST controller in SAS diagram
  This is our one (and only) route which exposes the endpoint for this server
*/
var express = require('express');
var dataConverter = require('../converter/dataconverter')
var dataManager = require('../db/datamanager')
var bodyParser = require('body-parser');

var router = express.Router();

console.log(dataConverter)
console.log(dataManager)

// a sample query meant to get a sense of the data 
const sampleQuery = 'SELECT row_to_json(row(id, ST_AsGeoJSON(geom),wkt)) ' +
    'FROM construccion;';

// package for retrieving data from fields as JSON, as we are to expect
// from the search team 
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

var dataConst= "";

router.post('/',(req,res) => {
    /* note that req.body receives the field data as JSON, e.g.:
       { construccionIds: '1 2 3', workshopIds: '5', terrenoIds: '3',
      formattype: 'csv', ... }
    */ 

    // TODO: for now, I am hard-coding a retrieval from only construccion

    // if ids are specified for the construccion table, in the example 
    // above this would be '1 2 3' 

    var construcRefs = req.body.construccionIds.trim()

    // Since this is the main body and not in an async function, we need to do a 
    // .then() to wait for the data
    getData(construcRefs).then((data) => {
        res.status(200) // success code
        .json({
            status: 'success',
            data: data,
            message: 'Got data from construccion'
        }); 
    });
});

// Returns a data promise from db 
async function getData(construcRefs) {

    // TODO: these refs probably need to be made general. for instance we
    // will probably receive refs from tables that are not just construccion,
    // workshop, or terreno.  

    if(construcRefs.trim().length > 0){
        // converts the field input "1 2 3" into a comma-delimited string, 
        // i.e., "1, 2, 3". input refs can be delimited by anything, 
        // for instance either "1b2e3" or "1-2-3" works  
        var refsAsList = construcRefs.split(/\D/).
            filter((val) => val).join(',');
        // now fetch data from database for these ids 
        const qString = 'SELECT row_to_json(row(id, ST_AsGeoJSON(geom),wkt))'
            + ' FROM construccion WHERE id IN('+ refsAsList +');';
        
        // Since this is called in an async function, data will be properly populated when 
        // it is returned.
        var data = await dataManager.fetchFromDb(qString);

        return data; 
    }
}

/* 
router.get('/', (req, res) => {

	// Returns data asynchronously into a promise
	// Until the success callback is called, data has not been received by
	// the REST controller
	dataManager.fetchFromDb(sampleQuery)
		.then((data) => {
			res.status(200) // success code
			.json({
				status: 'success',
				data: data,
				message: 'Got data from construccion'
			});	
		}, (error) => {
	
		});
}); */ 

module.exports = router;