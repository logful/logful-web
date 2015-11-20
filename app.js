var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var i18n = require("i18n");
var flash = require('connect-flash');
var proxy = require('express-http-proxy');

var Config = require('./config/config');

i18n.configure({
    locales: ['en', 'zh-CN'],
    defaultLocale: Config.locale,
    directory: __dirname + '/locales'
});

var routes = require('./routes/index');
var api = require('./routes/api');

var app = express();

app.use(i18n.init);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));
app.use(logger('dev'));

app.use('/proxy', proxy(Config.logfulApi, {
    decorateRequest: function (req) {
        // TODO
        return req;
    }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    secret: 'e6c9a8d564284e9cb094614fa3f27a23',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

app.use(express.static(path.join(__dirname, 'assets')));
app.use('/static', express.static(__dirname + '/bower_components'));

app.use('/', routes);
app.use('/api', api);

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
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

app.listen(8800);
