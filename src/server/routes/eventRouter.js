const express = require('express');
const eventRouter = express.Router();
const { getEvent } = require("../controllers/db.event.controller");

//GET
eventRouter.get('/', async(req, res) => {
  try{
    const event = await getEvent();
    res.json(event);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = [ eventRouter ];