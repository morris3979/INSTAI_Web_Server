const db = require('../database');
const Model = db.Model;
const Project = db.Project;

// Create and Save a new Model
exports.create = async (req, res) => {
    const {modelName, ProjectId} = req.body;

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

    // Create a Model
    const newModel = {
      modelName: modelName,
      ProjectId: ProjectId
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
