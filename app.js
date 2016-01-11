var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var request = require('request');

var routes = require('./routes/index');
var config = require('./config/config');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));

app.use('/api', function (req, res) {
    var url = config.logfulApi + '/api' + req.url;
    console.log(url);
    req.pipe(request(url)).pipe(res);
});
app.post('/login', function (req, res) {
    var body = req.body;
    if (body) {
        if (body.username && body.password) {
            var hash = crypto.createHash('sha256').update(body.password, 'utf8').digest('hex');
            console.log(hash);
            if (body.username === config.security.username && hash === config.security.password) {
                // TODO
                res.status(200).send({message: 'Authorized!', token: ''});
            }
            else {
                res.status(401).send({error: 'Unauthorized!'});
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
app.listen(8800);