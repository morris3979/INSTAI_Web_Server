const express = require('express');
const detailsRouter = express.Router();
const db = require('../entity/function');

detailsRouter.get('/', async(req, res) => {
  try{
    const details = await db.getDetails();
    res.json(details);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

detailsRouter.post("/", async (req, res) => {
  try{
    const details = await db.insertCarNumber();
    res.status(200).json(details);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})

module.exports = [ detailsRouter ];