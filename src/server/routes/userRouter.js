require('dotenv').config();
const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getConnection } = require("../entity/db_config");
const { User } = require("../entity/db_constructor");
const auth = require("../middleware/auth");

//POST register
userRouter.post("/register", async (req, res) => {
  try{
    const { username, password } = req.body;
    const connection = await getConnection();
    const oldUser = await connection.getRepository(User).findOne({
      username: username,
    });
    const encryptedPassword = bcrypt.hashSync(req.body.password, 10);
    if (!(username && password)) {
      res.status(400).send("All input is required");
    }
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    const users = new User();
    const token = jwt.sign(
      { users_id: users._id, username },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    users.username = username;
    users.password = encryptedPassword;
    users.token = token;
    await connection.getRepository(User).save(users);
    connection.close();
    // return new user
    res.status(201).json(users);
    return users;
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})

//POST login
userRouter.post('/login', async(req, res) => {
  try{
    const { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send("All input is required");
    }
    const connection = await getConnection();
    const user = await connection.getRepository(User).findOne({
      username: username,
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { users_id: user._id, username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      await connection.getRepository(User).save(user);
      connection.close();
      res.status(200).json(user);
      return user;
    }
    res.status(400).send("Invalid Credentials");
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

userRouter.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

//PATCH
// userRouter.patch("/:id", async (req, res) => {
//   const id = Number(req.params.id);
//   const username = req.body.username;
//   const password = bcrypt.hashSync(req.body.password, 10);
//   const administrator = req.body.administrator;
//   const modelA = req.body.modelA;
//   const modelB = req.body.modelB;
//   const modelC = req.body.modelC;
//   try{
//     const users = await patchUser(id, username, password, administrator, modelA, modelB, modelC);
//     res.status(204).json(users);
//   } catch (e) {
//     console.log(e);
//     res.sendStatus(500);
//   }
// })

//DELETE
// userRouter.delete("/:id", async (req, res) => {
//   const id = Number(req.params.id);
//   try{
//     const users = await deleteUser(id);
//     res.status(204).json(users);
//   } catch (e) {
//     console.log(e);
//     res.sendStatus(500);
//   }
// })

module.exports = [ userRouter ];