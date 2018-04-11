/*
  name: dataconverter-test.js 
  modified last by: guru
  date last modified: 11 apr 2018

*/

var geojson2 = require('geojson2');
var should = require('should');
var dataconverter = require('../converter/dataconverter');

const testfiles = __dirname + '/testfiles/';

describe('dataconverter', function(){
  this.timeout(500);

  it('should take a geojson file and output a csv file', function(done){
    setTimeout(done, 300);
    dataconverter.convertTo(testfiles + 'in.geojson', '.geojson', '.csv', function(err){
      if(err) throw err
      fs.exists(testfiles + 'in.csv', function(exists){
        exists.should.be.true
        done()
      })
    })
  })
  it('should take a geojson file and output a shape file', function(done){
    setTimeout(done, 300);
    dataconverter.convertTo(testfiles + 'in.geojson', '.geojson', '.shp', function(err){
      if(err) throw err
      fs.exists(testfiles + 'in.shp', function(exists){
        exists.should.be.true
        done()
      })
    })
  })
  it('should take a geojson file and output a kml file', function(done){
    setTimeout(done, 300);
    dataconverter.convertTo(testfiles + 'in.geojson', '.geojson', '.kml', function(err){
      if(err) throw err
      fs.exists(testfiles + 'in.kml', function(exists){
        exists.should.be.true
        done()
      })
    })
  })
  it('should take a geojson file and output a topojson file', function(done){
    setTimeout(done, 300);
    dataconverter.convertTo(testfiles + 'in.geojson', '.geojson', '.topojson', function(err){
      if(err) throw err
      fs.exists(testfiles + 'in.topojson', function(exists){
        exists.should.be.true
        done()
      })
    })
  })
})