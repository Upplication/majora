'use strict';

var multer = require('multer');

module.exports = multer({inMemory: true, putSingleFilesInArray: true});
