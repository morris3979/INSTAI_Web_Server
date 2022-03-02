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
    //return new list
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
  async function insertCarNumber(boardId, modelName, version, plateNumber) {
    const connection = await getConnection();
    const findBoardId = await connection.getRepository(CarNumber).findOne({
      boardId: req.body.boardId,
    });
    const findPlateNumber = await connection.getRepository(CarNumber).findOne({
      plateNumber: req.body.plateNumber,
    });
    //Create, if boardId & plateNumber is existed, it will be not created.
    if (!(findBoardId || findPlateNumber)) {
      const carnumbers = new CarNumber();
      carnumbers.boardId = boardId;
      carnumbers.modelName = modelName;
      carnumbers.version = version;
      carnumbers.plateNumber = plateNumber;
      //save
      await connection.getRepository(CarNumber).save(carnumbers);
      connection.close();
      //return new list
      return carnumbers;
    }
    const existed = "Existed";
    connection.close();
    return existed;
  }
  try{
    const carnumbers = await insertCarNumber(boardId, modelName, version, plateNumber);
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
  async function patchCarNumber(boardId, modelName, version, plateNumber) {
    const connection = await getConnection();
    //patch
    const carnumberRepo = connection.getRepository(CarNumber);
    const carnumber = new CarNumber();
    carnumber.boardId = boardId;
    carnumber.modelName = modelName;
    carnumber.version = version;
    carnumber.plateNumber = plateNumber;
    const updateCarnumbers = await carnumberRepo.findOne(id);
    //if not find id, it will be sent not found.
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
    await connection.getRepository(CarNumber).save(updateCarnumbers);
    connection.close();
    //return new list
    return updateCarnumbers;
  }
  try{
    const carnumbers = await patchCarNumber(boardId, modelName, version, plateNumber);
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
    const allCarnumbers = await carnumberRepo.softDelete(id);
    connection.close();
    //return new list
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