const db = require('../database');
const Project = db.Project;
const Organization = db.Organization;
const User = db.User;
const Data = db.Data;
const Device = db.Device;
const Label = db.Label;
const Model = db.Model;

// Create and Save a new Project
exports.create = async (req, res) => {
  const {project, type, OrganizationId, UserId} = req.body;

  // Validate request
  if (!(project && type && OrganizationId && UserId)) {
    res.status(400).send({
      message: "Project Name & Type can not be empty!"
    })
    return
  }
  const findOrganization = await Organization.findOne({
    where: { id: OrganizationId },
  })
  if (!findOrganization) {
    res.status(400).send({
      message: "Organization not existed, please create a new Organization!"
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

  // Create a Project
  const newProject = {
    project: project,
    type: type,
    OrganizationId: OrganizationId,
    UserId: UserId
  }

  // Save Project in the database
  Project.create(newProject)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Project."
      })
    })
}

// Update a Project by the id in the request
exports.update = (req, res) => {
  const id = req.params.id
  const project = req.body.project
  // Validate request
  if (!project) {
    res.status(400).send({
      message: "Project can not be empty!"
    })
    return
  }

  Project.update(req.body, {
    where: { id: id }
  }).then(num => {
      if (num == 1) {
        res.send({
          message: "Project was updated successfully."
        })
      } else {
        res.send({
          message: `Cannot update Project with id=${id}. Maybe Project was not found or req.body is empty!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Project with id=" + id
      })
    })
}

// Find a Project
exports.findProject = (req, res) => {
  Project.findOne({
      where: {
          id: req.params.id
      },
      attributes: {
          exclude: ['createdAt', 'updatedAt', 'deletedAt']
      }
  }).then(data => {
      if (!data) {
          return res.status(404).send({ message: "Project Not found." });
      }

      const replacer = (key, value) => {
          if (key == 'createdAt') return undefined
          else if (key == 'updatedAt') return undefined
          else if (key == 'deletedAt') return undefined
          else return value
      }

      res.send(JSON.parse(JSON.stringify(data, replacer)))
  }).catch(err => {
      res.status(500).send({ message: err.message })
  })
}

// Find all Data From a Project
exports.findData = (req, res) => {
  Project.findOne({
      where: {
          id: req.params.id
      },
      include: [{
          model: Data
      }],
      order: [
        [Data, 'id', 'DESC']
      ],
      attributes: {
          exclude: ['createdAt', 'updatedAt', 'deletedAt']
      }
  }).then(data => {
      // if (!data) {
      //   console.log('Data', data)
      //   return res.status(404).send({ message: "Data Not found." });
      // }

      const replacer = (key, value) => {
          if (key == 'createdAt') return undefined
          else if (key == 'updatedAt') return undefined
          else if (key == 'deletedAt') return undefined
          else return value
      }

      res.send(JSON.parse(JSON.stringify(data, replacer)))
  }).catch(err => {
      res.status(500).send({ message: err.message })
  })
}

// Find all Devices From a Project
exports.findDevice = (req, res) => {
  Project.findOne({
      where: {
          id: req.params.id
      },
      include: [{
          model: Device
      }],
      order: [
        [Device, 'id', 'DESC']
      ],
      attributes: {
          exclude: ['createdAt', 'updatedAt', 'deletedAt']
      }
  }).then(data => {
      // if (!data) {
      //   console.log('Device', data)
      //   return res.status(404).send({ message: "Device Not found." });
      // }

      const replacer = (key, value) => {
          if (key == 'createdAt') return undefined
          else if (key == 'updatedAt') return undefined
          else if (key == 'deletedAt') return undefined
          else if (key == 'type') return undefined
          else if (key == 'accessAuth') return undefined
          else if (key == 'accessKey') return undefined
          else if (key == 'secretKey') return undefined
          else return value
      }

      res.send(JSON.parse(JSON.stringify(data, replacer)))
  }).catch(err => {
      res.status(500).send({ message: err.message })
  })
}

// Find all Labels From a Project
exports.findLabel = (req, res) => {
  Project.findOne({
      where: {
          id: req.params.id
      },
      include: [{
          model: Label
      }],
      attributes: {
          exclude: ['createdAt', 'updatedAt', 'deletedAt']
      }
  }).then(data => {
      // if (!data) {
      //   console.log('Label', data)
      //   return res.status(404).send({ message: "Label Not found." });
      // }

      const replacer = (key, value) => {
          if (key == 'createdAt') return undefined
          else if (key == 'updatedAt') return undefined
          else if (key == 'deletedAt') return undefined
          else if (key == 'type') return undefined
          else if (key == 'accessAuth') return undefined
          else if (key == 'ProjectId') return undefined
          else if (key == 'OrganizationId') return undefined
          else if (key == 'UserId') return undefined
          else return value
      }

      res.send(JSON.parse(JSON.stringify(data, replacer)))
  }).catch(err => {
      res.status(500).send({ message: err.message })
  })
}

// Find all Models From a Project
exports.findModel = (req, res) => {
  Project.findOne({
      where: {
          id: req.params.id
      },
      include: [{
          model: Model,
          include: [{
              model: User,
              attributes: {
                exclude: ['password', 'admin', 'user', 'token']
              },
          }]
      }],
      attributes: {
          exclude: ['createdAt', 'updatedAt', 'deletedAt']
      }
  }).then(data => {
      // if (!data) {
      //   console.log('Model', data)
      //   return res.status(404).send({ message: "Model Not found." });
      // }

      const replacer = (key, value) => {
          if (key == 'updatedAt') return undefined
          else if (key == 'deletedAt') return undefined
          else if (key == 'type') return undefined
          else if (key == 'accessAuth') return undefined
          else if (key == 'ProjectId') return undefined
          else if (key == 'OrganizationId') return undefined
          else if (key == 'UserId') return undefined
          else return value
      }

      res.send(JSON.parse(JSON.stringify(data, replacer)))
  }).catch(err => {
      res.status(500).send({ message: err.message })
  })
}