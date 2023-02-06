const db = require('../database');
const Project = db.Project;
const Data = db.Data;
const User = db.User;

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

// Create and Save a new Data
exports.upload = async (req, res) => {
  const {data, image, ProjectId} = req.body;

  // Validate request
  if (!(data && image)) {
    res.status(400).send({
      message: "Data and Image can not be empty!"
    })
    return
  }
  const findProject = await Project.findOne({
    where: { id: ProjectId },
  })
  if (!findProject) {
    res.status(400).send({
      message: "Project not existed, please create a new Project!"
    })
    return
  }

  // Create a Data
  const newData = {
    data: data,
    image: image,
    ProjectId: ProjectId
  }

  // Save Data in the database
  Data.create(newData)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Data."
      })
    })
}

// upload image to s3
exports.uploadToS3 = async(req, res, key, callback) => {
    const upload = multer({
        storage: multerS3({
            s3: s3,
            // acl: 'public-read',
            bucket: process.env.AWS_BUCKET_NAME,
            metadata: (req, file, cb) => {
                cb(null, {fieldName: file.fieldname})
            },
            key: (req, file, cb) => {
                cb(null, 'image' + '/' + file.originalname) // file.originalname
            }
        })
    })
    const singleUpload = upload.single(key);
    singleUpload(req, res, (err) => {
        if (err) {
            callback({error: {title: 'File Upload Error', detail: err.message}})
        } else {
            callback(null, {url: req.file.location, key: req.file.key, filename: req.file.originalname})
        }
    })
}

// Find a Data onClick
exports.findData = (req, res) => {
  Data.findOne({
      where: {
          id: req.params.id
      },
      include: [{
          model: User
      }],
      attributes: {
          exclude: ['deletedAt']
      }
  }).then(data => {
      if (!data) {
          return res.status(404).send({ message: "Data Not found." });
      }

      const replacer = (key, value) => {
          if (key == 'deletedAt') return undefined
          else if (key == 'password') return undefined
          else if (key == 'admin') return undefined
          else if (key == 'user') return undefined
          else if (key == 'token') return undefined
          else return value
      }

      res.send(JSON.parse(JSON.stringify(data, replacer)))
  }).catch(err => {
      res.status(500).send({ message: err.message })
  })
}

// Update a Data Label by the id in the request
exports.updateLabel = async(req, res) => {
  const id = req.params.id
  const { json, UserId } = req.body
  // Validate request
  if (!(json && UserId)) {
    res.status(400).send({
      message: "json & UserId can not be empty!"
    })
    return
  }
  const findUser = await User.findOne({
    where: { id: UserId },
  })
  if (!findUser) {
    res.status(400).send({
      message: "User not existed, please create a new User!"
    })
    return
  }

  const newLabel = {
    json: json,
    UserId: UserId
  }

  Data.update(newLabel, {
    where: { id: id }
  }).then(num => {
      if (num == 1) {
        res.send({
          message: "Data was updated successfully."
        })
      } else {
        res.send({
          message: `Cannot update Data with id=${id}. Maybe Data was not found or req.body is empty!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Data with id=" + id
      })
    })
}