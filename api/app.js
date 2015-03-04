'use strict';

// TODO: Base config and config file

var express = require('express'),
    _ = require('lodash'),
    winston = require('winston'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    env = require('./config'),
    UserController = require('./controllers/user'),
    ApiController = require('./controllers/api'),
    TemplateController = require('./controllers/template'),
    HomeController = require('./controllers/home'),

    log = new winston.Logger({
        transports : [
            new winston.transports.Console({
                timestamp : true,
                level : 'debug'
            }),
            new winston.transports.File({
                filename : __dirname + '/logs/majora.log',
                level : 'debug'
            })
        ]
    }),
    app = express();

// Add middlewares
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect('mongodb://' + env.mongodb);

// Dependency Injection middleware
// Throught this middleware the dependencies are injected to the controllers
app.use(function (req, res, next) {
    req.log = log;
    next();
});

// TODO: Configure error handlers?

// interceptos

// Cors interceptor
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

// Add routes
app.get('/', HomeController.main);
app.post('/user/signup', UserController.signup);
app.post('/user/login', UserController.login);
// api router
app.get('/api/v1/', ApiController.v1.hello);
app.get('/api/v1/templates', ApiController.v1.getTemplates);
app.get('/api/v1/templates/:id', ApiController.v1.getTemplate);



// Serve
var server = app.listen(process.env.PORT || 3000, function () {
    log.log(_.template('Majora started at http://<%= host %>:<%= port %>', {
        host : server.address().address,
        port : server.address().port
    }));
});

module.exports = app;