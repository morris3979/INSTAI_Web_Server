const express = require('express');
const carnumberRouter = express.Router();
const { getConnection } = require("../entity/db_config");
const { CarNumber } = require("../entity/db_constructor");

//GET
carnumberRouter.get('/', async(req, res) => {
  async function getCarNumbers() {
    const connection = await getConnection();
    const carnumberRepo = connection.getRepository(CarNumber);
    const carnumbers = await carnumberRepo.find();
    connection.close();
    return carnumbers;
  }
  try{
    const carnumbers = await getCarNumbers();
    res.json(carnumbers);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//POST
carnumberRouter.post("/", async (req, res) => {
  const boardId = req.body.boardId;
  const modelName = req.body.modelName;
  const version = req.body.version;
  const plateNumber = req.body.plateNumber;
  const createAt = new Date(new Date().toLocaleDateString());
  async function insertCarNumber(boardId, modelName, version, plateNumber, createAt) {
    const connection = await getConnection();
    //create
    const carnumber = new CarNumber();
    carnumber.boardId = boardId;
    carnumber.modelName = modelName;
    carnumber.version = version;
    carnumber.plateNumber = plateNumber;
    carnumber.createAt = createAt;
    //save
    const carnumberRepo = connection.getRepository(CarNumber);
    const res = await carnumberRepo.save(carnumber);
    console.log("save", res);
    //return new list
    const allCarnumbers = await carnumberRepo.find();
    await connection.getRepository(CarNumber).save(allCarnumbers);
    connection.close();
    return allCarnumbers;
  }
  try{
    const carnumbers = await insertCarNumber(boardId, modelName, version, plateNumber, createAt);
    res.status(200).json(carnumbers);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})

//PATCH
carnumberRouter.patch("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const boardId = req.body.boardId;
  const modelName = req.body.modelName;
  const version = req.body.version;
  const plateNumber = req.body.plateNumber;
  const updateAt = new Date(new Date().toLocaleDateString());
  async function patchCarNumber(boardId, modelName, version, plateNumber, updateAt) {
    const connection = await getConnection();
    //patch
    const carnumberRepo = connection.getRepository(CarNumber);
    const carnumber = new CarNumber();
    carnumber.boardId = boardId;
    carnumber.modelName = modelName;
    carnumber.version = version;
    carnumber.plateNumber = plateNumber;
    carnumber.updateAt = updateAt;
    //return new list
    const updateCarnumbers = await carnumberRepo.findOne(id);
    if (!updateCarnumbers) {
      res.sendStatus(404);
      return;
    }
    if (carnumber.boardId) {
      updateCarnumbers.boardId = carnumber.boardId;
    }
    if (carnumber.modelName) {
      updateCarnumbers.modelName = carnumber.modelName;
    }
    if (carnumber.version) {
      updateCarnumbers.version = carnumber.version;
    }
    if (carnumber.plateNumber) {
      updateCarnumbers.plateNumber = carnumber.plateNumber;
    }
    if (carnumber.updateAt) {
      updateCarnumbers.updateAt = carnumber.updateAt;
    }
    await connection.getRepository(CarNumber).save(updateCarnumbers);
    connection.close();
    return updateCarnumbers;
  }
  try{
    const carnumbers = await patchCarNumber(boardId, modelName, version, plateNumber, updateAt);
    res.status(204).json(carnumbers);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})

//DELETE
carnumberRouter.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  async function deleteCarNumber() {
    const connection = await getConnection();
    //delete
    const carnumberRepo = connection.getRepository(CarNumber);
    //return new list
    const allCarnumbers = await carnumberRepo.delete(id);
    connection.close();
    return allCarnumbers;
  }
  try{
    const carnumbers = await deleteCarNumber();
    res.status(204).json(carnumbers);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})

module.exports = [ carnumberRouter ];