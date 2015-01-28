'use strict';

var validators = require('../util/validators'),
    UserModel = require('../models/user'),
    q = require('q'),
    bcrypt = require('bcrypt-nodejs');

var User = {};

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
        UserModel.create({email: form.email, password: bcrypt.hashSync(form.password), tokens: [UserModel.newToken()]},
            function (err, user) {
                if (err) sendError();
                var token = user.tokens[0];

                res.status(201).send({
                    success: true,
                    token: token
                });
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

    if (form.email
        && form.password) {
        UserModel.findByEmail(form.email, function (err, results) {
            if (!results || results.length === 0) {
                deferred.reject();
            } else {
                deferred.resolve(results[0]);
            }
        });
    } else {
        deferred.reject();
    }

    deferred.promise.then(function (user) {
        if (bcrypt.compareSync(form.password, user.password)) {
            var token = UserModel.newToken();
            user.tokens.push(token);

            user.save(function (err) {
                if (err) sendError();

                res.send({
                    success: true,
                    token: token
                });
            });
        } else {
            sendError();
        }
    }, function () {
        sendError();
    });
};

module.exports = User;