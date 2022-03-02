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

//PATCH
userRouter.patch("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const username = req.body.username;
  const password = bcrypt.hashSync(req.body.password, 10);
  const administrator = req.body.administrator;
  const modelA = req.body.modelA;
  const modelB = req.body.modelB;
  const modelC = req.body.modelC;
  async function patchUser(username, password, administrator, modelA, modelB, modelC) {
    const connection = await getConnection();
    //patch
    const userRepo = connection.getRepository(User);
    const user = new User();
    user.username = username;
    user.password = password;
    user.administrator = administrator;
    user.modelA = modelA;
    user.modelB = modelB;
    user.modelC = modelC;
    const updateUsers = await userRepo.findOne(id);
    //if not find id, it will be sent not found.
    if (!updateUsers) {
      res.sendStatus(404);
      return;
    }
    if (user.username) {
      updateUsers.username = user.username;
    }
    if (user.password) {
      updateUsers.password = user.password;
    }
    if (user.administrator) {
      updateUsers.administrator = user.administrator;
    }
    if (user.modelA) {
      updateUsers.modelA = user.modelA;
    }
    if (user.modelB) {
      updateUsers.modelB = user.modelB;
    }
    if (user.modelC) {
      updateUsers.modelC = user.modelC;
    }
    await connection.getRepository(User).save(updateUsers);
    connection.close();
    //return new list
    return updateUsers;
  }
  try{
    const users = await patchUser(username, password, administrator, modelA, modelB, modelC);
    res.status(204).json(users);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})

//DELETE
userRouter.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  async function deleteUser() {
    const connection = await getConnection();
    //delete
    const userRepo = connection.getRepository(User);
    const findAdmin = await userRepo.findOne(id);
    if (findAdmin.administrator == false) {
      const allUsers = await userRepo.softDelete(id);
      console.log(allUsers);
      connection.close();
      //return new list
      return allUsers;
    }
    const admin = "Unable to delete admin";
    connection.close();
    return admin;
  }
  try{
    const users = await deleteUser();
    res.status(204).json(users);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})

module.exports = [ userRouter ];