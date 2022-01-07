const { Router } = require('express');
const { createConnection, getRepository } = require('typeorm');
const carnumberRouter = Router({});
const { CarNumber } = require('../entity/CarNumber');

carnumberRouter.get('/', async(req, res) => {
  try{
    const newcarnumber = await getRepository(CarNumber).find();
    res.json(newcarnumber);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

carnumberRouter.post("/", async (req, res) => {
  try{
    const newcarnumber = await getRepository(CarNumber).create(req.body);
    const results = await getRepository(CarNumber).save(newcarnumber);
    res.status(200).json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})

module.exports = carnumberRouter;