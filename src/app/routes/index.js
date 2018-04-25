/*
  name: index.js
  modified last by: jerry
  date last modified: 25 apr 2018

  For fake download page. Most likely a deprecated file
*/
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.end(`
    <html>
    <head>
    </head>
    <body>
    <h1>Awesome Download Page</h1>
    Search #1 Results
    <form method="POST" action="/download">
    <table>
        <tr>
            <th>
            Tables
            </th>
            <th>
            Ids
            </th>
        </tr>
        <tr>
            <td>
            Construccion
            </td>
            <td>
            <input type="text" name="construccion" size="40"/>
            </td>
        </tr>
        <tr>
            <td>
            Workshop
            </td>
            <td>
            <input type="text" name="workshop_20170210" size="40"/>
            </td>
        </tr>
        <tr>
            <td>
            Terreno
            </td>
            <td>
            <input type="text" name="terreno" size="40"/>
            </td>
        </tr>
        <tr>
            <td colspan="2" align="center">
            <br/>
            <input type="radio" name="formattype" value="geojson"> GeoJSON 
            &nbsp;&nbsp;
            <input type="radio" name="formattype" value="kml"> KML &nbsp;&nbsp;
            <input type="radio" name="formattype" value="csv"> CSV &nbsp;&nbsp;
            <input type="radio" name="formattype" value="shp"> Shapefile
            <input type="radio" name="formattype" value="topojson"> topojson
            </td>
        </tr>
        <tr>
        <td colspan="3" align="center">
        <br/>
            <input type="submit"/>
        </td>
    </tr>
    <table>
    </form>
    <script src="/reload/reload.js"></script>
    </html>
    `);
});

module.exports = router;
