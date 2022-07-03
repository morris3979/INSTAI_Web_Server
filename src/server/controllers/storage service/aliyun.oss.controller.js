require('dotenv').config();
const OSS = require('ali-oss');

//initialize oss
const oss = new OSS({
    // region: 'oss-cn-shenzhen',
    accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
    accessKeySecret: process.env.ALIYUN_SECRET_ACCESS_KEY,
    bucket: process.env.ALIYUN_BUCKET_NAME,
    endpoint: 'oss-accelerate.aliyuncs.com', //accelerate
});

async function getFileFromOSS(getFolder, getFiles) {
    return oss.getStream(getFolder + '/' + getFiles);
}

module.exports = { getFileFromOSS }