const express = require('express');
const detailsRouter = express.Router();
const { getConnection } = require("../entity/db_config");
const { Details } = require("../entity/db_constructor");

//GET
detailsRouter.get('/', async(req, res) => {
  async function getDetails() {
    const connection = await getConnection();
    const detailRepo = connection.getRepository(Details);
    const details = await detailRepo.find({
      relations: ["CarNumber"],
    });
    connection.close();
    //return new list
    return details;
  }
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
  const startingTime = req.body.startingTime;
  const gpsState = req.body.gpsState;
  const speed = req.body.speed;
  const event = req.body.event;
  const position = req.body.position;
  async function insertDetail(startingTime, gpsState, speed, event, position) {
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
    const allDetails = await detailRepo.find();
    await connection.getRepository(CarNumber).save(allDetails);
    connection.close();
    //return new list
    return allDetails;
  }
  try{
    const details = await insertDetail(startingTime, gpsState, speed, event, position);
    res.status(200).json(details);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})

module.exports = [ detailsRouter ];