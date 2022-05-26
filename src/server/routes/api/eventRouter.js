const express = require('express');
const eventRouter = express.Router();
const { getEvent } = require("../../rds/controllers/event.controller");
const { getConnectionManager } = require("typeorm");

//GET
eventRouter.get('/', async(req, res) => {
  try{
    const event = await getEvent();
    res.json(event);
  } catch (e) {
    console.log(e);
    res.send(e);
    if (e.name === "AlreadyHasActiveConnectionError") {
      const existentConn = await getConnectionManager().get("default");;
      return existentConn;
    }
  }
});

module.exports = [ eventRouter ];