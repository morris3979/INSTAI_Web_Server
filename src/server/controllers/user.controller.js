require('dotenv').config();
const db = require('../database');
const User = db.User;
const UserGroup = db.UserGroup;
const Organization = db.Organization;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create and Save a new User
exports.register = async (req, res) => {
    const {username, email, password} = req.body

    // Validate request
    if (!(username && email && password)) {
      res.status(400).send({
        message: "Email & Password & Username can not be empty!"
      })
      return
    }
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(!regex.test(email)) {
      res.status(400).send({
        message: "Email format error, please try again!"
      })
      return
    }
    const existedEmail = await User.findOne({
      where: { email: email },
    })
    if (existedEmail) {
      res.status(400).send({
        message: "Account already exist. Please login!"
      })
      return
    }

    const encryptedPassword = bcrypt.hashSync(password, 10)
    const token = jwt.sign({ username: username },
        process.env.TOKEN_KEY, {
            expiresIn: "2h",
        }
    )

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

// Bind Users and Organization
exports.bindOrganization = async (req, res) => {
  const {userId, organizationId} = req.body

  // Validate request
  if (!(userId && organizationId)) {
    res.status(400).send({
      message: "userId & organizationId can not be empty!"
    })
    return
  }
  const findUser = await User.findOne({
    where: { id: userId },
  });
  if (!findUser) {
    res.status(400).send({
      message: "No User existed, Please create a new User!"
    })
    return
  }
  const findOrganization = await Organization.findOne({
    where: { id: organizationId },
  })
  if (!findOrganization) {
    res.status(400).send({
      message: "No Organization existed, Please create a new Organization!"
    })
    return
  }

  // Create a UserGroup
  const userGroup = {
    authorize: 'admin',
    UserId: userId,
    OrganizationId: organizationId
  }

  // Save Bind Users ID and Organization ID
  UserGroup.create(userGroup)
  .then(data => {
      res.send(data);
  })
  .catch(err => {
      res.status(500).send({
          message:
          err.message || "Some error occurred while creating the UserGroup."
      })
  })
}

// login
exports.login = async(req, res) => {
  const {email, password} = req.body

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
      return res.status(404).send({ message: "Don't have this account. Please register!" });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({message: "Wrong Password. Please try again!"});
    }

    const auth = user.admin || user.user;
    if (!(auth == true)) {
      return res.status(401).send({message: "Invalid Authority!"});
    }

    const token = jwt.sign({ email: email },
      process.env.TOKEN_KEY, {
        expiresIn: "2h",
      }
    )

    User.update({                                                  // Update User Table
      token: token
    }, {
      where: { email: email }
    }).then( data => {                                             // Find The User Information If it's success
          User.findOne({
            where: {
              email: email,
              token: token
            },
            include: [{
              model: db.Organization
            }],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'deletedAt']
            }
          }).then( data => {
            res.send(JSON.parse(JSON.stringify(data, replacer)))   // Send The User Information
          }).catch( err => {
            res.status(500).send({
              message: "No User existed, Please create a new User!"
            });
          })
    }).catch( err => {
          res.status(500).send({
            message: "Error updating User, Please try again!"
          });
      })

    const replacer = (key, value) => {
      if (key == 'password') return undefined
      else if (key == 'createdAt') return undefined
      else if (key == 'updatedAt') return undefined
      else if (key == 'deletedAt') return undefined
      else if (key == 'UserGroup') return undefined
      else return value
    }
  })
  .catch(err => {
    res.status(500).send({ message: err.message })
  })
}

// Get User Belongs Organization
exports.findOrganizations = (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Organization
    }],
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'deletedAt']
    }
  }).then(data => {
    if (!data) {
      return res.status(404).send({ message: "User Not found." });
    }

    const replacer = (key, value) => {
      if (key == 'password') return undefined
      else if (key == 'createdAt') return undefined
      else if (key == 'updatedAt') return undefined
      else if (key == 'deletedAt') return undefined
      else if (key == 'UserGroup') return undefined
      else return value
    }

    res.send(JSON.parse(JSON.stringify(data, replacer)))
  }).catch(err => {
    res.status(500).send({ message: err.message })
  })
}

// Bind Users and Organization
exports.inviteMember = async (req, res) => {
  const {email, organizationId} = req.body

  // Validate request
  if (!(email && organizationId)) {
    res.status(400).send({
      message: "email & organizationId can not be empty!"
    })
    return
  }
  const findUser = await User.findOne({
    where: { email: email },
  })
  if (!findUser) {
    res.status(400).send({
      message: "No User existed, Please create a new User!"
    })
    return
  }
  const findOrganization = await Organization.findOne({
    where: { id: organizationId },
  })
  if (!findOrganization) {
    res.status(400).send({
      message: "No Organization existed, Please create a new Organization!"
    })
    return
  }
  const findMember = await UserGroup.findOne({
    where: {
      UserId: findUser.dataValues.id,
      OrganizationId: organizationId
    }
  })
  if (findMember) {
    res.status(400).send({
      message: "This user is already a member!"
    })
    return
  }

  // Create a UserGroup
  const userGroup = {
    authorize: 'user',
    UserId: findUser.dataValues.id,
    OrganizationId: organizationId
  }

  // Save Bind Users ID and Organization ID
  UserGroup.create(userGroup)
  .then(data => {
      res.send(data);
  })
  .catch(err => {
      res.status(500).send({
          message:
          err.message || "Some error occurred while creating the UserGroup."
      })
  })
}

exports.update = (req, res) => {
  const id = req.params.id
  const username = req.body.username
  // Validate request
  if (!username) {
    res.status(400).send({
      message: "Username can not be empty!"
    })
    return
  }

  User.update(req.body, {
    where: { id: id }
  }).then(num => {
      if (num == 1) {
        res.send({
          message: "UserInfo was updated successfully."
        })
      } else {
        res.send({
          message: `Cannot update UserInfo with id=${id}. Maybe UserInfo was not found or req.body is empty!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating UserInfo with id=" + id
      })
    })
}

exports.ModifyPermissions = (req, res) => {
  const id = req.params.id;

  UserGroup.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "UserGroup was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update UserGroup with id=${id}. Maybe UserGroup was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating UserGroup with id=" + id
      });
    });
};