const express = require('express');
const eventRouter = express.Router();
const { getEvent, getCarNumberModel } = require("../../rds/controllers/event.controller");
const { getConnectionManager } = require("typeorm");

//GET
eventRouter.get('/', async(req, res) => {
  try{
    const event = await getEvent();
    res.json(event);
  } catch (e) {
    res.send(e);
    if (e.name === "AlreadyHasActiveConnectionError") {
      const existentConn = await getConnectionManager().get("default");;
      return existentConn;
    }
  }
});

//GET
eventRouter.get('/modelA', async(req, res) => {
  const modelName = "A";
  try{
    const event = await getCarNumberModel(modelName);
    res.json(event);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//GET
eventRouter.get('/modelB', async(req, res) => {
  const modelName = "B";
  try{
    const event = await getCarNumberModel(modelName);
    res.json(event);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//GET
eventRouter.get('/modelC', async(req, res) => {
  const modelName = "C";
  try{
    const event = await getCarNumberModel(modelName);
    res.json(event);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = [ eventRouter ];