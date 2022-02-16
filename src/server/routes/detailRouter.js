const express = require('express');
const detailsRouter = express.Router();
const { getConnection } = require("../entity/db_config");
const { Details } = require("../entity/db_constructor");

async function getDetails() {
  const connection = await getConnection();
  const detailRepo = connection.getRepository(Details);
  const details = await detailRepo.find({
    relations: ["CarNumber"],
  });
  connection.close();
  return details;
}

async function insertDetail(id, startingTime, gpsState, speed, event, position) {
  const connection = await getConnection();
  //create
  const details = new Details();
  details.id = id;
  details.startingTime = startingTime;
  details.gpsState = gpsState;
  details.speed = speed;
  details.event = event;
  details.position = position;
  //save
  const detailRepo = connection.getRepository(Details);
  const res = await detailRepo.save(details);
  console.log("save", res);
  //return new list
  const allDetails = await detailRepo.find();
  connection.close();
  return allDetails;
}

//GET
detailsRouter.get('/', async(req, res) => {
  try{
    const details = await getDetails();
    res.json(details);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//POST
detailsRouter.post("/", async (req, res) => {
  try{
    const details = await insertDetail();
    res.status(200).json(details);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})

module.exports = [ detailsRouter ];