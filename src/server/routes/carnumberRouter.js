const express = require('express');
const { createConnection, getRepository } = require('typeorm');
const carnumberRouter = express.Router();
const { CarNumber } = require('../entity/CarNumber');
const { Details } = require("../entity/Details")

carnumberRouter.get('/', async(req, res) => {
  try{
    res.json(await getRepository(CarNumber).find());
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

carnumberRouter.post("/upload", async (req, res) => {
  const body = { boardId: string, modelName: string, version: string, driverlicense:string } = req.body;
  // const newItem = new CarNumber();
  // newItem.boardId = body.boardId || "";
  // newItem.modelName = body.modelName || "";
  // newItem.version = body.version || "";
  // newItem.driverlicense = body || "";
  try{
    await getRepository(CarNumber).save(body);
    res.status(200).json();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})

module.exports = carnumberRouter;