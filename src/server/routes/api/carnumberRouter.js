const express = require('express');
const carnumberRouter = express.Router();
const {
  getCarNumbers,
  insertCarNumber,
  patchCarNumber,
  deleteCarNumber
} = require("../../rds/controllers/carnumber.controller")
const { getConnectionManager } = require("typeorm");

//GET
carnumberRouter.get('/', async(req, res) => {
  try{
    const carnumbers = await getCarNumbers();
    res.json(carnumbers);
  } catch (e) {
    console.log(e);
    res.send(e);
    if (e.name === "AlreadyHasActiveConnectionError") {
      const existentConn = await getConnectionManager().get("default");;
      return existentConn;
    }
  }
});

//POST
carnumberRouter.post("/", async (req, res) => {
  const boardId = req.body.boardId;
  const modelName = req.body.modelName;
  const version = req.body.version;
  const plateNumber = req.body.plateNumber;
  try{
    const carnumbers = await insertCarNumber(boardId, modelName, version, plateNumber);
    res.status(200).json(carnumbers);
  } catch (e) {
    console.log(e);
    res.send(e);
    if (e.name === "AlreadyHasActiveConnectionError") {
      const existentConn = await getConnectionManager().get("default");;
      return existentConn;
    }
  }
})

//PATCH
carnumberRouter.patch("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const boardId = req.body.boardId;
  const modelName = req.body.modelName;
  const version = req.body.version;
  const plateNumber = req.body.plateNumber;
  try{
    const carnumbers = await patchCarNumber(id, boardId, modelName, version, plateNumber);
    res.status(204).json(carnumbers);
  } catch (e) {
    console.log(e);
    res.send(e);
    if (e.name === "AlreadyHasActiveConnectionError") {
      const existentConn = await getConnectionManager().get("default");;
      return existentConn;
    }
  }
})

//DELETE
carnumberRouter.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try{
    const carnumbers = await deleteCarNumber(id);
    res.status(204).json(carnumbers);
  } catch (e) {
    console.log(e);
    res.send(e);
    if (e.name === "AlreadyHasActiveConnectionError") {
      const existentConn = await getConnectionManager().get("default");;
      return existentConn;
    }
  }
})

module.exports = [ carnumberRouter ];