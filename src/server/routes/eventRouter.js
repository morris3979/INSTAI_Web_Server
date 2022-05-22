const express = require('express');
const eventRouter = express.Router();
const { getEvent, getCarNumberModel } = require("../rds/controllers/event.controller");

//GET
eventRouter.get('/', async(req, res) => {
  try{
    const event = await getEvent();
    res.json(event);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
    return;
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
    return;
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
    return;
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
    return;
  }
});

module.exports = [ eventRouter ];