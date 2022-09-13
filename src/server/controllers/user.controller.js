require('dotenv').config();
const db = require('../database');
const User = db.User;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create and Save a new User
exports.register = async (req, res) => {
    const {username, password} = req.body;

    // Validate request
    if (!(username && password)) {
      res.status(400).send({
        message: "Username & Password can not be empty!"
      });
      return;
    }
    const existedUser = await User.findOne({
        where: { username: username },
      });
    if (existedUser) {
      res.status(400).send({
        message: "User already exist. Please login!"
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
        password: encryptedPassword,
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

// login
exports.login = async(req, res) => {
  const {username, password} = req.body;

  User.findOne({
    where: {
      username: username
    }
  }).then(user => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({message: "Invalid Password!"});
    }

    const auth = user.admin || user.authA || user.authB || user.authC;
    if (!(auth == true)) {
      return res.status(401).send({message: "Invalid Authority!"});
    }

    const token = jwt.sign({ username: username },
        process.env.TOKEN_KEY, {
            expiresIn: "2h",
        }
    );

    User.update({
      token: token
    }, {
      where: { username: username }
    })

    res.status(200).send({
      admin: user.admin,
      authA: user.authA,
      authB: user.authB,
      authC: user.authC,
      token: token
    });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}

// Retrieve all User from the database.
exports.findAll = (req, res) => {
  User.findAll({
        order: [
          ['createdAt', 'DESC'],
      ],
      attributes: {
          exclude: ['password', 'token']
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
};

// Update a User by the id in the request
exports.update = async(req, res) => {
  const id = req.params.id;
  const {
    // username, password,
    admin, authA, authB, authC
  } = req.body;
  // const encryptedPassword = bcrypt.hashSync(password, 10);

  User.update({
    // username: username,
    // password: encryptedPassword,
    admin: admin,
    authA: authA,
    authB: authB,
    authC: authC
  }, {
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

  if (findAdmin.dataValues.admin == false) {
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
};