const express = require('express');
const userRouter = express.Router();
const db = require('../entity/function');

userRouter.get('/', async(req, res) => {
  try{
    const users = await db.getUsers();
    res.json(users);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

userRouter.post("/register", async (req, res) => {
  try{
    const users = await db.insertUser();
    res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})

module.exports = [ userRouter ];