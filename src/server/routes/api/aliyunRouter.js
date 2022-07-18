const express = require('express');
const aliyunRouter = express.Router();
const { getFileFromOSS } = require("../../controllers/cloud service/aliyun.oss.controller");

aliyunRouter.get("/oss/getFile/:folder/:files", async(req, res) => {
    const getFolder = req.params.folder;
    const getFiles = req.params.files;
    try {
        const result = await getFileFromOSS(getFolder, getFiles);
        result.stream.pipe(res);
    } catch (error) {
        res.send({error:"Server Error"});
    }
});

module.exports = [ aliyunRouter ];