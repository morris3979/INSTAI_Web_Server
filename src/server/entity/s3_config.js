const AWS = require('aws-sdk');
require('dotenv').config();
 
const s3Client = new AWS.S3({
	region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
 
const downloadParams = {
    Bucket: process.env.AWS_BUCKET, 
    Key: '', // pass key
};

const s3 = {};
s3.s3Client = s3Client;
s3.downloadParams = downloadParams;
 
module.exports = s3;