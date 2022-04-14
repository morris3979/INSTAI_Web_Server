const express = require('express');
const detailsRouter = express.Router();
const { getDetails } = require("../controllers/db.details.controller");

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

module.exports = [ detailsRouter ];