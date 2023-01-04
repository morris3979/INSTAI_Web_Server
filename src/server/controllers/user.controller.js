require('dotenv').config();
const db = require('../database');
const User = db.User;
const UserGroup = db.UserGroup;
const Organization = db.Organization;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create and Save a new User
exports.register = async (req, res) => {
    const {username, email, password} = req.body;

    // Validate request
    if (!(username && email && password)) {
      res.status(400).send({
        message: "Username & Email & Password can not be empty!"
      });
      return;
    }
    const existedEmail = await User.findOne({
      where: { email: email },
    });
    if (existedEmail) {
      res.status(400).send({
        message: "Email already exist. Please login!"
      });
      return;
    }

    const encryptedPassword = bcrypt.hashSync(password, 10);
    const token = jwt.sign({ username: username },
        process.env.TOKEN_KEY, {
            expiresIn: "2h",
        }
    );

    // Create a User
    const user = {
        username: username,
        email: email,
        password: encryptedPassword,
        user: '1',
        token: token
    };

    // Save User in the database
    User.create(user)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the User."
        });
    });
}

// Create and Save a new Organization
exports.createOrganization = async (req, res) => {

  // Validate request
  if (!req.body.organization) {
    res.status(400).send({
      message: "Organization can not be empty!"
    });
    return;
  }

  // Create a Organization
  const organization = {
    organization: req.body.organization,
  };

  // Save Organization in the database
  Organization.create(organization)
  .then(data => {
      res.send(data);
  })
  .catch(err => {
      res.status(500).send({
          message:
          err.message || "Some error occurred while creating the Organization."
      });
  });
}

// Bind Users and Organization
exports.bindUserGroup = async (req, res) => {
  const {userId, organizationId} = req.body;

  // Validate request
  if (!(userId && organizationId)) {
    res.status(400).send({
      message: "userId & organizationId can not be empty!"
    });
    return;
  }
  const findUser = await User.findOne({
    where: { id: userId },
  });
  if (!findUser) {
    res.status(400).send({
      message: "No User existed, Please create a new User!"
    });
    return;
  }
  const findOrganization = await Organization.findOne({
    where: { id: organizationId },
  });
  if (!findOrganization) {
    res.status(400).send({
      message: "No Organization existed, Please create a new Organization!"
    });
    return;
  }

  // Create a UserGroup
  const userGroup = {
    UserId: userId,
    OrganizationId: organizationId
  };

  // Save Bind Users ID and Organization ID
  UserGroup.create(userGroup)
  .then(data => {
      res.send(data);
  })
  .catch(err => {
      res.status(500).send({
          message:
          err.message || "Some error occurred while creating the UserGroup."
      });
  });
}

// login
exports.login = async(req, res) => {
  const {email, password} = req.body;

  User.findOne({
    where: {
      email: email
    },
    include: [{
      model: db.Organization
    }],
    attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt']
    }
  }).then(user => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({message: "Invalid Password!"});
    }

    const auth = user.admin || user.user;
    if (!(auth == true)) {
      return res.status(401).send({message: "Invalid Authority!"});
    }

    const token = jwt.sign({ email: email },
      process.env.TOKEN_KEY, {
        expiresIn: "2h",
      }
    );

    User.update({
      token: token
    }, {
      where: { email: email }
    })

    const replacer = (key, value) => {
      if (key == 'password') return undefined
      else if (key == 'token') return undefined
      else if (key == 'createdAt') return undefined
      else if (key == 'updatedAt') return undefined
      else if (key == 'deletedAt') return undefined
      else if (key == 'UserGroup') return undefined
      else return value
    }

    res.send(JSON.parse(JSON.stringify(user, replacer)));
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}

// Retrieve all User from the database.
exports.findAll = (req, res) => {
  User.findAll({
      include: [{
          model: db.Project,
          attributes:['id', 'project', 'displayName']
      }],
      order: [
          ['id', 'DESC'],
      ],
      attributes: {
          exclude: ['password', 'token', 'createdAt', 'updatedAt', 'deletedAt']
      }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving projects."
      });
    });
}

// Update a User by the id in the request
exports.update = async(req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `id=${id} user authority was updated successfully.`
        });
      } else {
        res.send({
          message: `Cannot update User authority with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = async(req, res) => {
  const id = req.params.id;
  const findAdmin = await User.findOne({ where:{ id: id }});

  if (findAdmin.dataValues.developer == false) {
    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: `id=${id} user was deleted successfully!`
          });
        } else {
          res.send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
  } else {
    res.status(401).send({
      message: "Forbidden delete admin."
    });
  }
}