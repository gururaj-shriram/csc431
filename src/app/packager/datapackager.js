/*
  name: datapackager.js 
  modified last by: jerry
  date last modified: 8 apr 2018

*/
var zipper = require("zip-local");
var path = require('path');
var fs = require('fs');
var md5 = require ('md5');
var archiver = require ('archiver');

var __dirname = './test';

//TODO
//1. set up a zip directory to add the zips to (if it doesn't already exist)

//packages async

//cb is a function that looks like:
//function(filename, err)
//where filename is the name of the zip archive where the data was saved
//and err is an err message or null if no error

function package(filePaths, cb) {
    var raN = randomNames();
    var output = fs.createWriteStream(__dirname + '/' + raN + '.zip');
    console.log("Creating stream for file: " + __dirname + '/' + raN + '.zip');
    var archive = archiver('zip', {
        //talk with jerry about the level of compression level
        zlib: { level: 9 } // Sets the compression level.
    });

// listen for all archive data to be written
// 'close' event is fired only when a file descriptor is involved
    output.on('close', function() {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
        cb(__dirname + '/' + raN + '.zip');
    });

// This event is fired when the data source is drained no matter what was the data source.
// It is not part of this library but rather from the NodeJS Stream API.
// @see: https://nodejs.org/api/stream.html#stream_event_end
    output.on('end', function() {
        console.log('Data has been drained');
    });

// good practice to catch warnings (ie stat failures and other non-blocking errors)
    archive.on('warning', function(err) {
        if (err.code === 'ENOENT') {
            // log warning
        } else {
            // throw error
            cb(__dirname + '/' + raN + '.zip',  'zip file did not get created');
        }
    });

// good practice to catch this error explicitly
    archive.on('error', function(err) {
        cb(__dirname + '/' + raN + '.zip',  'zip file did not get created');
    });

// pipe archive data to the file
    archive.pipe(output);

// append a file from stream
    filePaths.forEach(function(file){
        archive.append(fs.createReadStream(file), { name: file });
    })

    archive.finalize();


    //async put all files into an archive
    //give a random name to the archive
}
//packages sync
function packageSync() {


}

function randomNames() {
    return md5(" " + Math.random()*100000);
}




module.exports.package = package;
module.exports.packageSync = packageSync;
