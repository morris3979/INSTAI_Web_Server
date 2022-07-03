const express = require('express');
const aliyunOSSRouter = express.Router();
const { getFileFromOSS } = require("../../controllers/storage service/aliyun.oss.controller");

aliyunOSSRouter.get("/getFile/:folder/:files", async(req, res) => {
    const getFolder = req.params.folder;
    const getFiles = req.params.files;
    try {
        const result = await getFileFromOSS(getFolder, getFiles);
        result.stream.pipe(res);
    } catch (error) {
        res.send({error:"Server Error"});
    }
});

module.exports = [ aliyunOSSRouter ];