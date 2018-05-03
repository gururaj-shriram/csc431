/*
  name: filewriter.js
  modified last by: jerry
  date last modified: 3 may 2018
  
*/

var fs = require('fs');
var del = require('del');

function mkdirForRequest(path) {
  fs.mkdirSync(path);
  console.log('made directory : ' + path);
}

function removeGJSON(path) {
  return del([path + '*.geojson']);
}

function copyLinkedMultimedia(mediaData, folderDir) {
  // copies multimedia data from its source directory (note that 
  // when this method is called, the multimedia links still have their
  // absolute path), to the temp directory for packaging later
  for (var i = 0; i < mediaData.length; i++) {
    var filename = mediaData[i].link.substring(
      mediaData[i].link.lastIndexOf('/') + 1
    );
    // TODO: the operation is synchronous... 
    if (!fs.existsSync(folderDir + filename)) {
      fs.copyFileSync(mediaData[i].link, folderDir + filename);
    }
  }
}

function generateFileName() {
  /* generates a random file name based on the date and a random number */
  var d = new Date();
  var fileName =
    ('0' + d.getFullYear()).slice(-2) +
    ('0' + (d.getMonth() + 1)).slice(-2) +
    d.getDate() +
    ('0' + d.getHours()).slice(-2) +
    ('0' + d.getMinutes()).slice(-2) +
    ('0' + d.getSeconds()).slice(-2) +
    Math.floor(Math.random() * 10000);

  return fileName;
}

function writeToFile(data, path, fileName) {
  /* writes a file to a given path */
  fs.writeFileSync(path + fileName + '.geojson', JSON.stringify(data));

  console.log('wrote to: ' + path + fileName + '.geojson');
}

module.exports.writeToFile = writeToFile;
module.exports.generateFileName = generateFileName;
module.exports.mkdirForRequest = mkdirForRequest;
module.exports.removeGJSON = removeGJSON;
module.exports.copyLinkedMultimedia = copyLinkedMultimedia;
