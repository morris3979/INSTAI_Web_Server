const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const {
  getUsers,
  insertUser,
  patchUser,
  deleteUser
} = require("../controllers/db.user.controller")

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
  const username = req.body.username;
  const password = bcrypt.hashSync(req.body.password, 10);
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
  try{
    const users = await patchUser(id, username, password, administrator, modelA, modelB, modelC);
    res.status(204).json(users);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})

//DELETE
userRouter.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try{
    const users = await deleteUser(id);
    res.status(204).json(users);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})

module.exports = [ userRouter ];