/*
  name: download-test.js 
  modified last by: guru
  date last modified: 4 may 2018

  end to end download integration test
  also a proof-of-work of the datapackager since a zip file results
*/

const async= require('async');
const sinon = require('sinon');
const request = require('request');
const chai = require('chai');

const should = chai.should();

const base = 'http://localhost:3000';

const url = `${base}/download`;

const options = {
    method: 'post',
    body: { 
      construccion: '1', 
      workshop_20170210: '2', 
      terreno: '3', 
      formattype: 'csv' 
    },
    json: true,
    url: url
  };  

function httpPost(url, callback) {
  request(options,
    function(err, res, body) {
      res.statusCode.should.equal(200);
      res.headers['content-type'].should.contain('application/zip');
      callback(err, body);
    }
  );
}

describe('end to end download test', () => {
  
  it('should take in table parameters and output a zip file', (done) => {
    request(options, (err, res, body) => {
      res.statusCode.should.equal(200);
      res.headers['content-type'].should.contain('application/zip');
      done();
    });
  });
  
  it('should take in 3 simultaneous requests', (done) => {
    let urls = [];

    for (let i = 0; i < 3; i++) {
      urls.push(url);
    }

    async.map(urls, httpPost, function (err, res){
      if (err) return console.log(err);
      done();
    });
  });

  it('should take in 10 simultaneous requests', (done) => {
    let urls = [];

    for (let i = 0; i < 10; i++) {
      urls.push(url);
    }

    async.map(urls, httpPost, function (err, res){
      if (err) return console.log(err);
      done();
    });
  });
});
