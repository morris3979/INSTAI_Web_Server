const db = require('../database');
const Project = db.Project;
const Data = db.Data;

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