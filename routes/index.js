var express = require('express');
var router = express.Router();
var path = require('path');

var config = require('../config/config');

/* GET home page. */
router.get('*', function (req, res, next) {
    res.sendFile(path.join(__dirname, '..', 'static/index.html'));
});

module.exports = router;
