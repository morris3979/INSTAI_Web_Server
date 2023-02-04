const db = require('../database');
const Label = db.Label;
const Project = db.Project;

// Create and Save a new Label
exports.create = async (req, res) => {
    const {labelClass, ProjectId} = req.body;

    // Validate request
    if (!labelClass) {
      res.status(400).send({
        message: "labelClass can not be empty!"
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

    // Create a Label
    const newLabel = {
      labelClass: labelClass,
      ProjectId: ProjectId
    };

    // Save Label in the database
    Label.create(newLabel)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Some error occurred while creating the Label."
      });
    });
}