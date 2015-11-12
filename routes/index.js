var express = require('express');
var router = express.Router();

var String = require('string');
var fs = require("fs");
var crypto = require('crypto');
var http = require('http');
var lineReader = require('line-reader');
var config = require('../config/config');

var weedFS = require('../utils/weedFS');

router.get('/', function (req, res, next) {
    if (req.session.user) {
        res.redirect('/index.html');
    }
    else {
        res.redirect('/login.html');
    }
});

router.get('/index.html', function (req, res, next) {
    if (req.session.user) {
        res.render('status', {
            common: res.__('common'),
            property: res.__('dashboardPage')
        });
    }
    else {
        res.redirect('/login.html');
    }
});

router.get('/search.html', function (req, res, next) {
    if (req.session.user) {
        res.render('search', {
            common: res.__('common'),
            property: res.__('uidToolPage')
        });
    }
    else {
        res.redirect('/login.html');
    }
});

router.get('/util.html', function (req, res, next) {
    if (req.session.user) {
        res.render('util', {
            common: res.__('common'),
            property: res.__('logFileToolPage')
        });
    }
    else {
        res.redirect('/login.html');
    }
});

router.get('/control.html', function (req, res, next) {
    if (req.session.user) {
        res.render('control', {
            common: res.__('common'),
            property: res.__('systemControlPage')
        });
    }
    else {
        res.redirect('/login.html');
    }
});

router.get('/log/viewer.html', function (req, res) {
    if (!req.session.user) {
        res.redirect('/login.html');
    }
    var filename = req.query.filename;
    var fid = req.query.fid;

    if (!fid || !filename) {
        res.status(400).send({error: 'Request param error!'});
    }

    weedFS.read(fid, function (error, filePath) {
        if (error) {
            res.status(500).send({error: 'Read log file error!'});
        }
        else {
            if (filePath) {
                if (!fs.existsSync(filePath)) {
                    res.status(404).send({error: 'File not found!'});
                }
                var rows = [];
                lineReader.eachLine(filePath, function (line, last) {
                    var parts = line.split('\u1699\u168f\u16e5');
                    var record;
                    if (parts.length == 3) {
                        record = {
                            time: parts[0],
                            tag: parts[1],
                            msg: String(parts[2]).replaceAll('\u203c\u204b\u25a9', '\n').s
                        };
                        rows.push(record);
                    }
                    else if (parts.length == 4) {
                        record = {
                            time: parts[0],
                            tag: parts[1],
                            msg: String(parts[2]).replaceAll('\u203c\u204b\u25a9', '\n').s,
                            att: '/attachment/' + parts[3] + '.jpg'
                        };
                        rows.push(record);
                    }
                    if (last) {
                        var meta = {
                            filename: filename,
                            line: rows.length
                        };
                        res.render('viewer.jade', {
                            common: res.__('logFileViewer'),
                            lines: rows,
                            meta: meta
                        });

                        fs.unlink(filePath, function (error) {
                            if (error) {
                                console.log(error);
                            }
                        });
                        return false;
                    }
                });
            }
            else {
                res.status(404).send({error: 'File not found!'});
            }
        }
    });
});

router.get('/login.html', function (req, res, next) {
    res.render('login', {
        title: "Sign in",
        messages: req.flash('error'),
        property: res.__('login')
    });
});

router.post('/login.html', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var remember = req.body.remember;
    if (username && password) {
        var hashPassword = crypto.createHash('sha256').update(password, 'utf8').digest('hex');
        if (username === config.security.username && hashPassword === config.security.password) {
            req.session.user = username;
            if (remember && remember === 'true') {
                req.session.cookie.maxAge = 3600000;
            }
            res.redirect('/index.html');
        }
        else {
            req.flash('error', 'Username and password wrong');
            res.redirect('/login.html');
        }
    }
    else {
        req.flash('error', 'Please input username and password');
        res.redirect('/login.html');
    }
});

router.get('/logout.html', function (req, res, next) {
    req.session.user = null;
    res.redirect('/login.html');
});

module.exports = router;
