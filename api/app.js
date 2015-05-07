'use strict';

// TODO: Base config and config file

var express = require('express'),
    _ = require('lodash'),
    winston = require('winston'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    env = require('./config'),
    // middlewares
    cors = require('./middlewares/cors.js'),
    auth = require('./middlewares/auth'),
    multer  = require('./middlewares/multer'),
    // controllers
    UserController = require('./controllers/user'),
    ApiController = require('./controllers/api'),
    TemplateController = require('./controllers/template'),
    HomeController = require('./controllers/home'),

    log = new winston.Logger({
        transports: [
            new winston.transports.Console({
                timestamp: true,
                level: 'debug'
            }),
            new winston.transports.File({
                filename: __dirname + '/logs/majora.log',
                level: 'debug'
            })
        ]
    }),
    app = express();

// Add middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors);
app.use(multer);

mongoose.connect('mongodb://' + env.mongodb);

// Dependency Injection middleware
// Through this middleware the dependencies are injected to the controllers
app.use(function (req, res, next) {
    req.log = log;
    next();
});

// Add routes
app.get('/', HomeController.main);
app.post('/user/signup', UserController.signup);
app.post('/user/login', UserController.login);

// api router
app.get('/api/v1/templates', ApiController.v1.getTemplates);
app.get('/api/v1/templates/:authorUserName', ApiController.v1.getTemplates);
app.get('/api/v1/template/:name', ApiController.v1.getTemplate);

// template routes
app.post('/template/create', auth, TemplateController.create);

// Serve
var server = app.listen(process.env.PORT || 3000, function () {
    log.log(_.template('Majora started at http://<%= host %>:<%= port %>', {
        host: server.address().address,
        port: server.address().port
    }));
});

module.exports = app;