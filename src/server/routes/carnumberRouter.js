const express = require('express');
const carnumberRouter = express.Router();
const { getCarNumbers, insertCarNumber } = require('../entity/CarNumber');
const { Details } = require("../entity/Details");

carnumberRouter.get('/test', async(req, res) => {
  try{
    res.send("TEST");
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

carnumberRouter.get('/', async(req, res) => {
  try{
    const carnumbers = await getCarNumbers();
    res.json(carnumbers);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

carnumberRouter.post("/upload", async (req, res) => {
  try{
    const carnumbers = await insertCarNumber();
    res.status(200).json(carnumbers);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})

module.exports = carnumberRouter;