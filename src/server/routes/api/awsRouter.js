const express = require('express');
const awsRouter = express.Router();
const s3 = require("../../controllers/cloud service/aws.s3.controller");
// const IotController = require('../../controllers/cloud service/aws.iot.controller');

awsRouter.post("s3/upload", (req, res) => {
    const file = req.files.file;
    s3.uploadToS3(file, (error, data) => {
        console.log("commit")
        if (error) {
            return res.send({error:"Something went wrong."});
        }
        return res.send({message:"File uploaded successfully"});
    });
});

awsRouter.get("s3/getFile/:folder/:files", async(req, res) => {
    const getFolder = req.params.folder;
    const getFiles = req.params.files;
    try {
        let fileToSend = await s3.getFileFromS3(getFolder, getFiles);
        //pipe the file to res
        fileToSend.pipe(res);
    } catch (error) {
        res.send({error:"Server Error"});
    }
});

awsRouter.delete("s3/deleteFile/:folder/:files", (req, res) => {
    const getFolder = req.params.folder;
    const getFile = req.params.files;
    s3.deleteFileFromS3(getFolder, getFile, (error, data) => {
        if (error) {
            return res.send({error:"Can not delete file, Please try again later"});
        }
        return res.send({message:"File has been deleted successfully"});
    });
});

// const {
//     IotController: { publish },
// } = IotController;


const AWS = require('aws-sdk');
const iotData = new AWS.IotData({ endpoint: "a1pxy4ej19lukk-ats.iot.us-east-1.amazonaws.com" });

awsRouter.post("iot/updateMsg", async(req, res) => {
    const topicHouse1 = "send_topic";
    const params = {
        topic: topicHouse1,
        payload: Data,
        qos: 1
    };
    iotData.publish(params, function(err, data){
        if(err){
            console.log("Error occurred : ",err, err.stack);
        }
        else{
            console.log("Success ...", data);
        }
    });
    //  IotController.publish((error, data) => {
    //     if (error) {
    //         return res.send({error:"Can not delete file, Please try again later"});
    //     }
    //     return res.send({message:"File has been deleted successfully"});
    //  });
});

module.exports = [ awsRouter ];