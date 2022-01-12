const express = require('express');
const userRouter = express.Router();
const db = require('../entity/db');

userRouter.get('/', async(req, res) => {
  try{
    const users = await db.getUsers();
    res.json(users);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

userRouter.post("/", async (req, res) => {
  try{
    const users = await db.insertUser();
    res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})

module.exports = [ userRouter ];