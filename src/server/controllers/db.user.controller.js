const { getConnection } = require("../entity/db_config");
const { User } = require("../entity/db_constructor");
require('dotenv').config();


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

module.exports = { getUsers, getUserName, patchUser, deleteUser }