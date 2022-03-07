const { getConnection } = require("../entity/db_config");
const { User } = require("../entity/db_constructor");
require('dotenv').config();

async function getUsers() {
  const connection = await getConnection();
  const userRepo = connection.getRepository(User);
  const users = await userRepo.find();
  connection.close();
  return users;
}

async function getUserName(username) {
  const connection = await getConnection();
  const users = await connection.getRepository(User).findOne({
    username: username,
  });
  connection.close();
  return users;
}

async function insertUser(username, password, token) {
    const connection = await getConnection();
    const oldUser = await connection.getRepository(User).findOne({
      username: username,
    });
    //create
    if (!oldUser) {
      const users = new User();
      users.username = username;
      users.password = password;
      users.token = token;
      //save
      await connection.getRepository(User).save(users);
      connection.close();
      //return new list
      return users;
    }
    const existed = "User Already Exist. Please Login";
    connection.close();
    return existed;
}

async function patchUser(id, username, password, administrator, modelA, modelB, modelC) {
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

async function deleteUser(id) {
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

module.exports = { getUsers, getUserName, insertUser, patchUser, deleteUser }