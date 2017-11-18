const express = require('express');
const router = express.Router();
const Article = require('../models/article');

router.get('/', function(req, res, next) {
	return res.send('Hello World');
});

module.exports = router;