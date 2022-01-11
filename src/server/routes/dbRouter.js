const express = require('express');
const carnumberRouter = express.Router();
const db = require('../entity/db');

carnumberRouter.get('/test', async(req, res) => {
  try{
    res.send("TEST");
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

carnumberRouter.get('/carnumber', async(req, res) => {
  try{
    const carnumbers = await db.getCarNumbers();
    res.json(carnumbers);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

carnumberRouter.post("/upload", async (req, res) => {
  try{
    const carnumbers = await db.insertCarNumber();
    res.status(200).json(carnumbers);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})

module.exports = carnumberRouter;