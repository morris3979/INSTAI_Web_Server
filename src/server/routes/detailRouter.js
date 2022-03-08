const express = require('express');
const detailsRouter = express.Router();
const { getDetails, insertDetail } = require("../controllers/db.detail.controller");

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
  const { startingTime, gpsState, speed, event, position, CarNumber } = req.body;
  try{
    const details = await insertDetail(startingTime, gpsState, speed, event, position, CarNumber);
    res.status(200).json(details);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})

module.exports = [ detailsRouter ];