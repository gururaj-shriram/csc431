/*
  name: dataconverter-test.js 
  modified last by: guru
  date last modified: 11 apr 2018

*/

var geojson2 = require('geojson2');
var chai = require('chai');
var dataconverter = require('../converter/dataconverter');
var expect = chai.expect;
var should = chai.should;

const testfiles = __dirname + '/testfiles/';

describe('dataconverter', function(){
  this.timeout(500);

  it('should take a geojson file and output a csv file', function(done){
    setTimeout(done, 300);
    dataconverter.convertTo(testfiles + 'in.geojson', '.geojson', '.csv', function(err){
      if(err) throw err
      fs.exists(testfiles + 'in.csv', function(exists){
        exists.should.be.true;
        done()
      })
    })
  })
  it('should take a geojson file and output a shape file', function(done){
    setTimeout(done, 300);
    dataconverter.convertTo(testfiles + 'in.geojson', '.geojson', '.shp', function(err){
      if(err) throw err
      fs.exists(testfiles + 'in.shp', function(exists){
        exists.should.be.true;
        done()
      })
    })
  })
  it('should take a geojson file and output a kml file', function(done){
    setTimeout(done, 300);
    dataconverter.convertTo(testfiles + 'in.geojson', '.geojson', '.kml', function(err){
      if(err) throw err
      fs.exists(testfiles + 'in.kml', function(exists){
        exists.should.be.true;
        done()
      })
    })
  })
  it('should take a geojson file and output a topojson file', function(done){
    setTimeout(done, 300);
    dataconverter.convertTo(testfiles + 'in.geojson', '.geojson', '.topojson', function(err){
      if(err) throw err
      fs.exists(testfiles + 'in.topojson', function(exists){
        exists.should.be.true;
        done()
      })
    })
  })
  it('should take a geojson file and output a csv file even though the . is missing', function(done){
    setTimeout(done, 300);
    dataconverter.convertTo(testfiles + 'in.geojson', 'geojson', 'csv', function(err){
      if(err) throw err
      fs.exists(testfiles + 'in.csv', function(exists){
        exists.should.be.true;
        done()
      })
    })
  })
  // TODO(guru): figure out how to catch expected errors in chai
  // it('should throw a file path not found error', function(done){
  //   setTimeout(done, 300);
  //   expect(function() {dataconverter.convertTo('/fake/dir/path', 'geojson', 'csv')}).to.not.throw()
  // })
}) 