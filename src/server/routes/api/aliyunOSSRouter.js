const express = require('express');
const aliyunOSSRouter = express.Router();

require('dotenv').config();
const OSS = require('ali-oss');

//initialize oss
const oss = new OSS({
    region: 'oss-cn-shenzhen',
    accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
    accessKeySecret: process.env.ALIYUN_SECRET_ACCESS_KEY,
    bucket: process.env.ALIYUN_BUCKET_NAME,
    // endpoint: 'oss-accelerate.aliyuncs.com', //accelerate
});

aliyunOSSRouter.get("/getFile/:folder/:files", async(req, res) => {
    const getFolder = req.params.folder;
    const getFile = req.params.files;
    try {
        const result = await oss.getStream(getFolder + '/' + getFile);
        result.stream.pipe(res);
    } catch (error) {
        res.send({error:"Server Error"});
    }
});

module.exports = [ aliyunOSSRouter ];