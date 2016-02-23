var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var request = require('request');
var jwt = require('jsonwebtoken');
var compress = require('compression');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var routes = require('./routes/index');
var config = require('./config/config');

var app = express();
app.use(cors());
app.use(cookieParser());
app.use(compress());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'static')));

app.use('/api', function (req, res) {
    var uri = req.url;
    var url = config.logfulApi + '/api' + uri;
    var token = req.headers['access-token'] || req.cookies['access-token'];
    if (token) {
        jwt.verify(token, config.security.secret, function (error, decoded) {
            if (error) {
                return res.status(401).send({error: 'Unauthorized!'});
            }
            else {
                req.pipe(request({
                    url: url,
                    qs: req.query,
                    method: req.method.toLowerCase()
                }, function (error, response, body) {
                    if (error && error.code === 'ECONNREFUSED') {
                        return res.status(500).send({error: 'Remote API server error!'});
                    }
                })).pipe(res);
            }
        });
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/authenticate', function (req, res) {
    var body = req.body;
    if (body) {
        console.log(body);
        if (body.username && body.password) {
            var hash = crypto.createHash('sha256').update(body.password, 'utf8').digest('hex');
            if (body.username === config.security.username && hash === config.security.password) {
                var expires = 86400;
                if (body.remember) {
                    expires = 7776000;
                }
                var token = jwt.sign(body.username, config.security.secret, {
                    expiresInSeconds: expires
                });
                res.status(200).send({token: token, expiresIn: expires});
            }
            else {
                res.status(401).send({error: 'Wrong password!'});
            }
        }
        else {
            res.status(401).send({error: 'Unauthorized!'});
        }
    }
    else {
        res.status(400).send({error: 'No username or password!'});
    }
});

app.get('/revoked', function (req, res) {

});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        console.log({message: err.message, error: err});
    });
}

// production error handler
// no stacktrace leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    console.log({message: err.message});
});

module.exports = app;
app.listen(6400);