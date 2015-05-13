'use strict';

var aws = require('aws-sdk'),
	accessKeyId =  process.env.AWS_ACCESS_KEY || "AKIAJDXA57UY3XFDDMCA",
	secretAccessKey = process.env.AWS_SECRET_KEY || "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",
	bucket = process.env.AWS_BUCKET || 'temp-upplication',
	path = process.env.AWS_FOLDER || 'DES';

aws.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
});

var awsS3 = new aws.S3();

module.exports = {
	upload: function(name, body, callback) {
		var params = {
            Bucket: bucket,
            Key: path + '/' + name,
            Body: body
        };
        awsS3.upload(params, callback);
	},
    remove: function(name, callback) {
        var params = {
          Bucket: bucket,
          Key: name.split('.com')[1]
        };
        awsS3.deleteObject(params, callback);
    }
};
