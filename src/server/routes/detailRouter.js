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
  const startingTime = req.body.startingTime;
  const gpsState = req.body.gpsState;
  const speed = req.body.speed;
  const event = req.body.event;
  const position = req.body.position;
  try{
    const details = await insertDetail(startingTime, gpsState, speed, event, position);
    res.status(200).json(details);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})

module.exports = [ detailsRouter ];