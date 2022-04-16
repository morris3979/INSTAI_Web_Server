const express = require('express');
const awsS3Router = express.Router();
const awsWorker = require("../s3controllers/aws_s3_controller");

awsS3Router.get("/files/:filename", awsWorker.doDownload);

module.exports = [ awsS3Router ];