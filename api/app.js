'use strict';

// TODO: Base config and config file

var express = require('express'),
    _ = require('lodash'),
    winston = require('winston'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),

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
    app = express();

// Add middlewares
app.use(bodyParser.json());
app.use(cookieParser());

var envs = {
    'development': {
        'mongodb': 'localhost:27017/majora' 
    },
    'test': {
        'mongodb': 'localhost:27017/majora'
    },
    'production': {
        'mongodb': process.env.MAJORA_MONGODB_URL || 'localhost:27017/majora'
    }
};

// Configure mongoose for the different envs
var env = process.env.NODE_ENV || 'development';
mongoose.connect('mongodb://' + envs[env].mongodb);

// Dependency Injection middleware
// Throught this middleware the dependencies are injected to the controllers
app.use(function (req, res, next) {
    req.log = log;

    next();
});

// TODO: Configure error handlers?

// Add routes
app.get('/', HomeController.main);

// Serve
var server = app.listen(process.env.PORT || 3000, function () {
    log.log(_.template('Majora started at http://<%= host %>:<%= port %>', {
        host : server.address().address,
        port : server.address().port
    }));
});

module.exports = app;