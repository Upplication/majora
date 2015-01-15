'use strict';

var express = require('express'),
    _ = require('lodash'),
    winston = require('winston'),
    q = require('q'),
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

app.get('/', HomeController.main);

var server = app.listen(process.env.MAJORA_PORT, function () {
    log.log(_.template('Majora started at http://<%= host %>:<%= port %>', {
        host : server.address().address,
        port : server.address().port
    }));
});