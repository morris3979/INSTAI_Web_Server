const express = require('express');
const userRouter = express.Router();
const { getConnection } = require("../entity/db_config");
const { User } = require("../entity/db_constructor");

async function getUsers() {
  const connection = await getConnection();
  const userRepo = connection.getRepository(User);
  const users = await userRepo.find();
  connection.close();
  return users;
}

async function insertUser(id, username, password, administrator, pageA, pageB, pageC) {
  const connection = await getConnection();
  //create
  const users = new User();
  users.id = id;
  users.username = username;
  users.password = password;
  users.administrator = administrator;
  users.pageA = pageA;
  users.pageB = pageB;
  users.pageC = pageC;
  //save
  const userRepo = connection.getRepository(User);
  console.log("user", User);
  const res = await userRepo.save(users);
  console.log("save", res);
  //return new list
  const allUsers = await userRepo.find();
  connection.close();
  return allUsers;
}

//GET
userRouter.get('/', async(req, res) => {
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
  try{
    const users = await insertUser();
    res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})

module.exports = [ userRouter ];