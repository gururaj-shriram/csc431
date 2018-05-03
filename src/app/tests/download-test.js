/*
  name: download-test.js 
  modified last by: guru
  date last modified: 2 may 2018

  end to end download integration test
  also a proof-of-work of the datapackager since a zip file results
*/

const sinon = require('sinon');
const request = require('request');
const chai = require('chai');

const should = chai.should();

const base = 'http://localhost:3000';

describe('end to end download test', () => {
    it('should take in table parameters and output a zip file', (done) => {
      const options = {
        method: 'post',
        body: { 
          construccion: '1', 
          workshop_20170210: '2', 
          terreno: '3', 
          formattype: 'csv' 
        },
        json: true,
        url: `${base}/download`
      };    

        request(options, (err, res, body) => {
          res.statusCode.should.equal(200);
          res.headers['content-type'].should.contain('application/zip');
          done();
        });
    });
});
