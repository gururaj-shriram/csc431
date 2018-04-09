// For fake download page. Most likely a deprecated file
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
	res.send(`
    <h1>Awesome Download Page</h1>
    <p>Contruccion</p>
    <a href="./download">
   		<input type="button" value="Download as geoJSON" />
	</a>
    <script src="/reload/reload.js"></script>
    `);
});

module.exports = router;
