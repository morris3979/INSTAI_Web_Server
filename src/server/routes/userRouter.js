const express = require('express');
const userRouter = express.Router();
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
  const password = req.body.password;
  const administrator = req.body.administrator;
  const pageA = req.body.pageA;
  const pageB = req.body.pageB;
  const pageC = req.body.pageC;
  const createAt = new Date(new Date().toLocaleDateString());
  async function insertUser(username, password, administrator, pageA, pageB, pageC, createAt) {
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
    users.createAt = createAt;
    //save
    const userRepo = connection.getRepository(User);
    console.log("user", User);
    const res = await userRepo.save(users);
    console.log("save", res);
    //return new list
    const allUsers = await userRepo.find();
    await connection.getRepository(CarNumber).save(allUsers);
    connection.close();
    return allUsers;
  }
  try{
    const users = await insertUser(username, password, administrator, pageA, pageB, pageC, createAt);
    res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})

module.exports = [ userRouter ];