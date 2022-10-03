const express = require('express');
const awsRouter = express.Router();
const async = require('async');
const s3 = require("../../controllers/cloud service/aws.s3.controller");
const IotController = require('../../controllers/cloud service/aws.iot.controller');

// upload model file
awsRouter.post("/s3/upload/:modelName/:modelVersion", (req, res) => {
    const {modelName, modelVersion} = req.params;
    async.parallel([
        function(callback) {
            s3.uploadToS3(modelName, modelVersion, req, res, 'file', callback);
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
        const model = [{
            modelList: modelList
        }]
        res.send(model);
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

// AWS IOT MQTT publish message
awsRouter.post("/iot/publish", async(req, res) => {
    const { topic, device, type } = req.query;
    const { deviceId, command } = req.body;
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    const sendContent = {
        deviceId: deviceId,
        command: command,
    }
    const IoTDevice = {
        serialNumber: topic,
        device: device, // RaspberryPi
        type: type, // OTADevice
        request: {...sendContent},
        dateTime
    }
    try {
        return IotController.publish(topic, IoTDevice).pipe();
    } catch (callback) {
        res.send(callback);
    }
});

module.exports = [ awsRouter ];