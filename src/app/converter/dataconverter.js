/*
  name: dataconverter.js 
  modified last by: guru
  date last modified: 11 apr 2018

*/

// Note: Some conversions require ogr2ogr
// brew install gdal

var geojson2 = require("geojson2");
var path = require('path');
var fs = require('fs');

// Assume inFormat and outFormat are in the form .EXTENSION
function convertTo(filePath, inFormat, outFormat) {
  const dirname = path.dirname(filePath) + '/';
  const newFileName = path.basename(filePath, inFormat) + outFormat;

  if (fs.stat(filePath), (err, stats) => {
  	if (err) {
  		throw err;
  	} 

  	if (!stats.isFile()) {
  		throw new Error('Requested file path does not point to a file');
  	}
  })

  if (inFormat.charAt(0) !== '.') {
  	inFormat = '.' + inFormat;
  } 

  if (outFormat.charAt(0) !== '.') {
  	outFormat = '.' + outFormat;
  } 

  if (inFormat !== outFormat) {

	  switch(outFormat) {
	  	case '.csv':
	  		geojson2.csv(filePath, dirname + newFileName, (err) => {
	  			if (err) {
	  				console.log(err);
	  			}
	  		});
	  		break;
	  	// Shp files have multiple files. 
	  	// The third parameter says whether or not to zip them together.
	  	case '.shp':
	  		geojson2.shp(filePath, dirname + newFileName, false, (err) => {
	  			if (err) {
	  				console.log(err);
	  			}
	  		});
	  		break;
	  	case '.kml':
	  		geojson2.kml(filePath, dirname + newFileName, (err) => {
	  			if (err) {
	  				console.log(err);
	  			}
	  		});
	  		break;
	  	case '.topojson':
	  		geojson2.topojson(filePath, dirname + newFileName, (err) => {
	  			if (err) {
	  				console.log(err);
	  			}
	  		});
	  		break;
	  	default:
	  		throw new Error('Invalid Argument: ' + outFormat + ' is not a ' +
	  			'supported outputfile format');
	  }
  }

  console.log('converted ' + filePath + ' to ' + dirname + newFileName);
}

module.exports.convertTo = convertTo
