require('dotenv').config();
const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require("../middleware/auth");
const { getConnection } = require("../entity/db_config");
const { User } = require("../entity/db_constructor");

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
      { _id: users.id, username },
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
    const comparePwd = await bcrypt.compare(password, user.password);
    const mode = user.administrator || user.modelA || user.modelB || user.modelC;
    if (user && comparePwd && (mode == true)) {
      const token = jwt.sign(
        { _id: user.id, username },
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

// POST welcome
userRouter.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome！ ");
});

// GET
userRouter.get("/", async (req, res) => {
  try{
    const connection = await getConnection();
    const userRepo = connection.getRepository(User);
    const users = await userRepo.find();
    const findUser = await users.filter((t) => {
    const {username, administrator, modelA, modelB, modelC} = t;
      console.log("1:", )
    });
    connection.close();
    res.json(users);
    return users;
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})

// PATCH
userRouter.patch("/:id", async (req, res) => {
  try{
    const id = Number(req.params.id)
    const { username, password, administrator, modelA, modelB, modelC } = req.body;
    const connection = await getConnection();
    const user = await connection.getRepository(User).findOne(id);
    if (user) {
      user.username = username;
      user.password = bcrypt.hashSync(password, 10);
      user.administrator = administrator;
      user.modelA = modelA;
      user.modelB = modelB;
      user.modelC = modelC;
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
      res.status(204).json(user);
      return user;
    }
    res.status(404).send("Not Found");
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})

// DELETE
userRouter.delete("/:id", async (req, res) => {
  try{
    const id = req.params.id;
    const connection = await getConnection();
    const userRepo = connection.getRepository(User);
    const findAdmin = await userRepo.findOne(id);
    if (findAdmin.administrator == false) {
      const deletedUser = await userRepo.softDelete(id);
      connection.close();
      res.status(204).json(deletedUser);
      //return new list
      return deletedUser;
    }
    res.status(403).send("Forbidden");
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})

module.exports = [ userRouter ];