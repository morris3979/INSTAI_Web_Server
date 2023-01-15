require('dotenv').config();
const aws = require('aws-sdk');
const multer = require("multer");
const multerS3 = require("multer-s3");

//configure the aws environment
aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

//initialize s3
const s3 = new aws.S3();

//constant params
const constantParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
}

// upload labeled json file to s3
exports.uploadToS3 = async(req, res, key, callback) => {
    const upload = multer({
        storage: multerS3({
            s3: s3,
            // acl: 'public-read',
            bucket: process.env.AWS_BUCKET_NAME,
            metadata: (req, file, cb) => {
                cb(null, {fieldName: file.fieldname});
            },
            key: (req, file, cb) => {
                cb(null, 'json' + '/' + file.originalname); // file.originalname
            }
        })
    });
    const singleUpload = upload.single(key);
    singleUpload(req, res, function(err) {
        if (err) {
            callback({error: {title: 'File Upload Error', detail: err.message}});
        } else {
            callback(null, {url: req.file.location, key: req.file.key});
        }
    });
};

// download file from s3 bucket
exports.getFileFromS3 = (folder, key) => {
    const downloadParams = {
        Key: folder + '/' + key,
       ...constantParams
    };
    return s3.getObject(downloadParams).createReadStream();
};

exports.listObject = () => {
    const params = {
        Bucket: 'lab321-model',
        Prefix: '', // model/
    }
    return s3.listObjects(params).promise();
}

// delete file from s3 bucket
exports.deleteFileFromS3 = (folder, key, next) => {
    const deleteParams = {
        Key: folder + '/' + key,
        ...constantParams
    };
    s3.deleteObject(deleteParams, (error, data) => {
        console.log(error, data);
        next(error, data);
    });
};
