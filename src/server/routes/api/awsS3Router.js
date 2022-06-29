const express = require('express');
const awsS3Router = express.Router();
const awsWorker = require("../../controllers/s3/aws.s3.controller");

awsS3Router.get("/files/:filename", awsWorker.doDownload);

module.exports = [ awsS3Router ];