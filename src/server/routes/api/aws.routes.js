const express = require('express');
const awsRouter = express.Router();
const async = require('async');
const s3 = require("../../controllers/cloud service/aws.s3.controller");
const IotController = require('../../controllers/cloud service/aws.iot.controller');

// upload labeled json file
awsRouter.post("/s3/upload/json/label", (req, res) => {
    async.parallel([
        function(callback) {
            s3.uploadLabelDataToS3(req, res, 'file', callback);
        }], function(err, result){
        if (err) {
            return res.status(422).send(err);
        } else {
            res.status(200).send(result[0]);
        }}
    )
});

// upload trainData json file
awsRouter.post("/s3/upload/json/train", (req, res) => {
    async.parallel([
        function(callback) {
            s3.uploadTrainDataToS3(req, res, 'file', callback);
        }], function(err, result){
        if (err) {
            return res.status(422).send(err);
        } else {
            res.status(200).send(result[0]);
        }}
    )
});

// get file from bucket folder
awsRouter.get("/s3/getFile/:folder/:files", async(req, res) => {
    const getFolder = req.params.folder;
    const getFiles = req.params.files;
    try {
        let fileToSend = await s3.getFileFromS3(getFolder, getFiles);
        //pipe the file to res
        fileToSend.pipe(res);
    } catch (error) {
        res.send({error: "Server Error", error});
    }
});

// list object from bucket folder
awsRouter.get("/s3/listObject", async(req, res) => {
    try {
        let fileToSend = await s3.listObject();
        //pipe the file to res
        const modelList = [];
        fileToSend.Contents.forEach((item, index) => {
            // console.log(item.Key);
            modelList.push({id: index, modelName: item.Key});
        });
        res.send(modelList);
    } catch (error) {
        res.send({error: "Server Error", error});
    }
});

awsRouter.delete("/s3/deleteFile/:folder/:files", (req, res) => {
    const getFolder = req.params.folder;
    const getFile = req.params.files;
    s3.deleteFileFromS3(getFolder, getFile, (error, data) => {
        if (error) {
            return res.send({error:"Can not delete file, Please try again later"});
        }
        return res.send({message:"File has been deleted successfully"});
    });
});

// AWS IOT MQTT publish message for OTA Device
awsRouter.post("/iot/publish", async(req, res) => {
    const { topic, deviceName } = req.query;
    const { command } = req.body;
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    const IoTDevice = {
        serialNumber: topic,
        deviceName: deviceName,
        command: command,
        dateTime
    }
    try {
        return IotController.publish(topic, IoTDevice).pipe();
    } catch (callback) {
        res.send(callback);
    }
});

// AWS IOT MQTT publish message for AI Server
awsRouter.post("/iot/publish/AIServer", async(req, res) => {
    const { project, modelName } = req.body;
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    const toServer = {
        action: 'Train',
        project: project,
        modelName: modelName,
        dateTime
    }
    try {
        return IotController.publish('toAIServer', toServer).pipe();
    } catch (callback) {
        res.send(callback);
    }
});

module.exports = [ awsRouter ];