const express = require('express');
const dataRouter = express.Router();
const async = require('async');
const Data = require('../../controllers/data.controller');

// Create a new Data
dataRouter.post("/", Data.upload);

// Upload image to s3
dataRouter.post("/uploadToS3", (req, res) => {
    async.parallel([
        function(callback) {
            Data.uploadToS3(req, res, 'file', callback);
        }], function(err, result){
        if (err) {
            return res.status(422).send(err);
        } else {
            res.status(200).send(result[0]);
        }}
    )
});

// Find a Data onClick
dataRouter.get("/:id", Data.findData);

// Update Label
dataRouter.patch("/:id/label", Data.updateLabel);

module.exports = [ dataRouter ];