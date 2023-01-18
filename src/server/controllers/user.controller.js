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

    User.update({
      token: token
    }, {
      where: { email: email }
    })

    const replacer = (key, value) => {
      if (key == 'password') return undefined
      else if (key == 'createdAt') return undefined
      else if (key == 'updatedAt') return undefined
      else if (key == 'deletedAt') return undefined
      else if (key == 'UserGroup') return undefined
      else return value
    }

    res.send(JSON.parse(JSON.stringify(user, replacer)))
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
      return res.status(404).send({ message: "Organization Not found." });
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
  const findBindUser = await UserGroup.findOne({
    where: { UserId: findUser.dataValues.id }
  })
  const findBindOrganization = await UserGroup.findOne({
    where: { OrganizationId: organizationId }
  })
  if (findBindUser && findBindOrganization) {
    res.status(400).send({
      message: "This user is already a member!"
    })
    return
  }

  // Create a UserGroup
  const userGroup = {
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