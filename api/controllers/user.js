'use strict';

var validators = require('../util/validators'),
    UserModel = require('../models/user'),
    TokenModel = require('../models/token'),
    q = require('q');

var User = {},
    createToken = function (user, res) {
        TokenModel.create(TokenModel.newToken(user._id), function (err, token) {
            if (err) next(err);
            res.send({
                success: true,
                token: token.token
            });
        });
    };

// User signup
User.signup = function (req, res) {
    var form = req.body,
        sendError = function () {
            res.status(400).send({
                success: false
            });
        },
        deferred = q.defer();

    if (form.email
        && form.password
        && form.password.length >= 8
        && validators.isEmailValid(form.email)) {
        UserModel.findByEmail(form.email, function (err, results) {
            if (results && results.length > 0) {
                deferred.reject();
            } else {
                deferred.resolve();
            }
        });
    } else {
        deferred.reject();
    }

    deferred.promise.then(function () {
        UserModel.create({username: form.email, password: form.password},
            function (err, user) {
                if (err) sendError();
                res.status(201);
                createToken(user, res);
            });
    }, function () {
        sendError();
    });
};

// User login
User.login = function (req, res) {
    var form = req.body,
        sendError = function () {
            res.status(400).send({
                success: false
            });
        },
        deferred = q.defer();

    if (form.email && form.password) {
        UserModel.findByEmail(form.email, function (err, results) {
            if (!results || results.length === 0) {
                console.log('user NOT found');
                deferred.reject();
            } else {
                deferred.resolve(results[0]);
            }
        });
    } else {
        deferred.reject();
    }

    deferred.promise.then(function (user) {
        if (user.passwordMatches(form.password)) {
            createToken(user, res);
        } else {
            sendError();
        }
    }, function () {
        sendError();
    });
};

module.exports = User;