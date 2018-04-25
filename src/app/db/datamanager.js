/*
  name: datamanager.js
  modified last by: jerry
  date last modified: 25 apr 2018
*/

const promise = require('bluebird');

const initOptions = {
    promiseLib: promise // overriding the default (ES6 Promise);
};

const pgp = require('pg-promise')(initOptions);

const connection = {
    user: 'Jerry', // put your username for the db here
    host: '127.0.0.1', // don't change
    database: 'lasflores', // don't change
    password: '', // possibly, you may have a password
    port: 5432, // don't change
  };

const db = pgp(connection);

function fetchFromDb(queryString) {

  // Returns a promise
  return db.any(queryString, [true])
    .then(data => {
        // need to format the geoJSON returned as a feature collection
        // for conversion 
        for(var i = 0; i < data.length; i++){
            data[i]["type"] = "Feature";
            data[i]["properties"] = { 
                // table/layer id should be included in the properties
                // attribute, not as a standalone attribute
                "id" : data[i].id
            };
            delete data[i].id; // safe to remove this attribute 
        }

        var geojson = {
            "type": "FeatureCollection",
            "features": data
        };
        return geojson;
    })
    .catch (err => {
      console.log(err.stack);
    });
}

function generateQuery(ids,tableName){
    if(tableName.localeCompare('construccion') == 0){
        return 'SELECT id, ST_AsGeoJSON(geom)::json as geometry '
            + ' FROM construccion WHERE id IN('+ ids +');'
    }else if(tableName.localeCompare('terreno') == 0){
        return 'SELECT id, ST_AsGeoJSON(geom)::json As geometry'
            + ' FROM terreno WHERE id IN('+ ids +');'
    }else if(tableName.localeCompare('workshop_20170210') == 0){
        return 'SELECT id, ST_AsGeoJSON(geom)::json As geometry'
            + ' FROM workshop_20170210 WHERE id IN('+ ids +');'
    }
    
    return undefined;
 }

 /* no longer needed; keep here for research 

function generateQueryOld(ids,tableName){
  if(tableName.localeCompare('construccion') == 0){
      return 'SELECT row_to_json(row(id, ST_AsGeoJSON(geom),"OBJECTID", "CODIGO", '
          +' "TERRENO_CODIGO", "TIPO_CONSTRUCCION", "TIPO_DOMINIO", "NUMERO_PISOS", '
          +' "NUMERO_SOTANOS", "NUMERO_MEZANINES", "NUMERO_SEMISOTANOS", "ETIQUETA", '
          +' "IDENTIFICADOR", "CODIGO_EDIFICACION", "CODIGO_ANTERIOR", "SHAPE.AREA", "SHAPE.LEN", wkt))'
          + ' FROM construccion WHERE id IN('+ ids +');'
  }else if(tableName.localeCompare('terreno') == 0){
      return 'SELECT row_to_json(row(id, ST_AsGeoJSON(geom),"OBJECTID", "CODIGO",'
          +' "CODIGO_ANTERIOR", "SHAPE.AREA", "SHAPE.LEN", wkt))'
          + ' FROM terreno WHERE id IN('+ ids +');'
  }else if(tableName.localeCompare('workshop_20170210') == 0){
      return 'SELECT row_to_json(row(id, ST_AsGeoJSON(geom),codigo, fuente, wkt))'
          + ' FROM workshop_20170210 WHERE id IN('+ ids +');'
  }
  
  return undefined;
}

*/ 

module.exports.fetchFromDb = fetchFromDb
module.exports.generateQuery = generateQuery
