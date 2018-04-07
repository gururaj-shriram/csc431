var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
	res.send(`
    <h1>Test Response</h1>
    <script src="/reload/reload.js"></script>
    `);
});

module.exports = router;
