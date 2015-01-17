'use strict';

var Home = {};

Home.main = function (req, res) {
    res.send({'message': 'hello world'});
};

module.exports = Home;