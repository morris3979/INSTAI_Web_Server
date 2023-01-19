const db = require('../database');
const Organization = db.Organization;
const Project = db.Project;
const User = db.User;

// Create and Save a new Organization
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.organization) {
        res.status(400).send({
        message: "Organization can not be empty!"
        });
        return
    }

    // Create a Organization
    const organization = {
        organization: req.body.organization,
    }

    // Save Organization in the database
    Organization.create(organization)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Organization."
        })
    })
}

// Find User Owned Projects
exports.findProjects = (req, res) => {
    Organization.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: Project,
            include: [{
                model: User
            }]
        }],
        order: [
          [Project, 'id', 'DESC']
        ],
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'deletedAt']
        }
    }).then(data => {
        if (!data) {
            return res.status(404).send({ message: "Organization Not found." });
        }

        const replacer = (key, value) => {
            if (key == 'createdAt') return undefined
            else if (key == 'deletedAt') return undefined
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

// Get Organization Users
exports.findUsers = (req, res) => {
    Organization.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: User
      }],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt']
      }
    }).then(data => {
      if (!data) {
        return res.status(404).send({ message: "Organization Not found." });
      }

      // const newUsers = {
      //   id: data.id,
      //   organization: data.organization,
      //   Users: [
      //     {
      //       id: data.Users.id,
      //       username: data.Users.username,
      //       authorize: data.Users.UserGroup.authorize,
      //       status: data.Users.UserGroup.status
      //     }
      //   ]
      // }

      const replacer = (key, value) => {
        if (key == 'password') return undefined
        else if (key == 'admin') return undefined
        else if (key == 'user') return undefined
        else if (key == 'token') return undefined
        else if (key == 'createdAt') return undefined
        else if (key == 'updatedAt') return undefined
        else if (key == 'deletedAt') return undefined
        else return value
      }

      res.send(JSON.parse(JSON.stringify(data, replacer)))
      // res.send(newUsers)
    }).catch(err => {
      res.status(500).send({ message: err.message })
    })
}