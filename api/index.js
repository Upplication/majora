'use strict';

// TODO: Base config and config file

var express = require('express'),
    _ = require('lodash'),
    winston = require('winston'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    q = require('q'),
    mongo = require('mongodb'),
    monk = require('monk'),

    UserController = require('./controllers/user'),
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
    app = express(),
    db = monk(process.env.MAJORA_MONGODB_URL || 'localhost:27017/majora');

// Add middlewares
app.use(bodyParser.json());
app.use(cookieParser());

// Dependency Injection middleware
// Throught this middleware the dependencies are injected to the controllers
app.use(function (req, res, next) {
    req.db = db;
    req.log = log;

    next();
});

// TODO: Configure error handlers?

// Add routes
app.get('/', HomeController.main);

// Serve
var server = app.listen(process.env.MAJORA_PORT, function () {
    log.log(_.template('Majora started at http://<%= host %>:<%= port %>', {
        host : server.address().address,
        port : server.address().port
    }));
});