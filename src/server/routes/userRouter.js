const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const { getConnection } = require("../entity/db_config");
const { User } = require("../entity/db_constructor");

//GET
userRouter.get('/', async(req, res) => {
  async function getUsers() {
    const connection = await getConnection();
    const userRepo = connection.getRepository(User);
    const users = await userRepo.find();
    connection.close();
    return users;
  }
  try{
    const users = await getUsers();
    res.json(users);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//POST
userRouter.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = bcrypt.hashSync(req.body.password, 10);
  async function insertUser(username, password) {
    const connection = await getConnection();
    const findUserName = await connection.getRepository(User).findOne({
      username: req.body.username,
    });
    //create
    if (!findUserName) {
      const users = new User();
      users.username = username;
      users.password = password;
      //save
      await connection.getRepository(User).save(users);
      connection.close();
      //return new list
      return users;
    }
    const existed = "Existed";
    connection.close();
    return existed;
  }
  try{
    const users = await insertUser(username, password);
    res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})

module.exports = [ userRouter ];