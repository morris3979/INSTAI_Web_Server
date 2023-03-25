const db = require('../database');
const Model = db.Model;
const Project = db.Project;
const User = db.User;
const Data = db.Data;
const ModelGroup = db.ModelGroup;

// Create and Save a new Model
exports.create = async (req, res) => {
    const {modelName, status, ProjectId, UserId} = req.body;

    // Validate request
    if (!modelName) {
      res.status(400).send({
        message: "modelName can not be empty!"
      });
      return;
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
    const findUser = await User.findOne({
      where: { id: UserId },
    })
    if (!findUser) {
      res.status(400).send({
        message: "User not existed, please create a new User!"
      })
      return
    }

    // Create a Model
    const newModel = {
      modelName: modelName,
      status: status,
      ProjectId: ProjectId,
      UserId: UserId
    };

    // Save Model in the database
    Model.create(newModel)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Some error occurred while creating the Model."
      });
    });
}

// Bind Model and Data
exports.bindModelData = async (req, res) => {
  const {modelId, dataId} = req.body

  // Validate request
  if (!(modelId && dataId)) {
    res.status(400).send({
      message: "modelId & dataId can not be empty!"
    })
    return
  }
  const findModel = await Model.findOne({
    where: { id: modelId },
  });
  if (!findModel) {
    res.status(400).send({
      message: "No Model existed, Please create a new Model!"
    })
    return
  }
  const findData = await Data.findOne({
    where: { id: dataId },
  })
  if (!findData) {
    res.status(400).send({
      message: "No Data existed, Please create a new Data!"
    })
    return
  }

  // Create a ModelGroup
  const modelGroup = {
    ModelId: modelId,
    DatumId: dataId
  }

  // Save Bind Users ID and Organization ID
  ModelGroup.create(modelGroup)
  .then(data => {
      res.send(data);
  })
  .catch(err => {
      res.status(500).send({
          message:
          err.message || "Some error occurred while creating the ModelGroup."
      })
  })
}
