const db = require('../database');
const Model = db.Model;
const Project = db.Project;
const User = db.User;

// Create and Save a new Model
exports.create = async (req, res) => {
    const {modelName, dataset, status, ProjectId, UserId} = req.body

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
      dataset: dataset,
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
