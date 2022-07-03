const express = require('express');
const awsS3Router = express.Router();
const s3 = require("../../controllers/storage service/aws.s3.controller");

awsS3Router.post("/upload", (req, res) => {
    const file = req.files.file;
    s3.uploadToS3(file, (error, data) => {
        console.log("commit")
        if (error) {
            return res.send({error:"Something went wrong."});
        }
        return res.send({message:"File uploaded successfully"});
    });
});

awsS3Router.get("/getFile/:folder/:files", async(req, res) => {
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

awsS3Router.delete("/deleteFile/:folder/:files", (req, res) => {
    const getFolder = req.params.folder;
    const getFile = req.params.files;
    s3.deleteFileFromS3(getFolder, getFile, (error, data) => {
        if (error) {
            return res.send({error:"Can not delete file, Please try again later"});
        }
        return res.send({message:"File has been deleted successfully"});
    });
});

module.exports = [ awsS3Router ];