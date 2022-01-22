const express = require('express');
const carnumberRouter = express.Router();
const { getConnection } = require("../entity/db_config");
const { CarNumber } = require("../entity/db_constructor");

async function getCarNumbers() {
  const connection = await getConnection();
  const carnumberRepo = connection.getRepository(CarNumber);
  const carnumbers = await carnumberRepo.find();
  connection.close();
  return carnumbers;
}

async function insertCarNumber(id, boardId, modelName, version, plateNumber, createAt) {
  const connection = await getConnection();
  //create
  const carnumber = new CarNumber();
  carnumber.id = id;
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
  connection.close();
  return allCarnumbers;
}

//GET
carnumberRouter.get('/', async(req, res) => {
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
  try{
    const carnumbers = await insertCarNumber();
    res.status(200).json(carnumbers);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})

module.exports = [ carnumberRouter ];