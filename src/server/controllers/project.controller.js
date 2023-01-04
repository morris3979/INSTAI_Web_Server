const db = require('../database');
const Project = db.Project;
const Organization = db.Organization;

// Create and Save a new Project
exports.create = async (req, res) => {
  const {project, OrganizationId} = req.body;

  // Validate request
  if (!(project && OrganizationId)) {
    res.status(400).send({
      message: "Project and OrganizationId can not be empty!"
    });
    return;
  }
  const findOrganization = await Organization.findOne({
    where: { id: OrganizationId },
  })
  if (!findOrganization) {
    res.status(400).send({
      message: "Organization not existed, please create a new Organization!"
    });
    return;
  }

  // Create a Project
  const newProject = {
    project: project,
    OrganizationId: OrganizationId
  };

  // Save Project in the database
  Project.create(newProject)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Project."
      });
    });
}

// Retrieve all Project from the database.
// exports.findAll = (req, res) => {
//     Project.findAll({
//       include: [{
//           model: db.Host,
//           attributes: {
//               exclude: [
//                 'type', 'command', 'response', 'accessKey', 'secretKey',
//                 'ProjectId', 'createdAt', 'updatedAt', 'deletedAt'
//               ]
//           },
//           include: [{
//               model: db.Device,
//               attributes:['id', 'deviceId', 'deviceName'],
//           }],
//       },{
//         model: db.User,
//         attributes: ['id', 'username', 'createdAt'],
//       }],
//       attributes: {
//           exclude: ['createdAt', 'updatedAt', 'deletedAt']
//       },
//       order: [
//         ['id', 'ASC'],
//       ],
//     })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving projects."
//         });
//       });
// };

// Update a Project by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Project.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Project was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Project with id=${id}. Maybe Project was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Project with id=" + id
      });
    });
};

// Delete a Project with the specified id in the request
// exports.delete = (req, res) => {
//   const id = req.params.id;

//   Project.destroy({
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "Project was deleted successfully!"
//         });
//       } else {
//         res.send({
//           message: `Cannot delete Project with id=${id}. Maybe Project was not found!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Could not delete Project with id=" + id
//       });
//     });
// };