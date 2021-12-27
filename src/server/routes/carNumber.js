const { Request, Router } = require('express');
const { getRepository } = require('typeorm');
const carnumberRouter = Router({});

const {CarNumber} = require('../entity/database');


carnumberRouter.get('/', async(req, res) => {
  try{
    let carNumber = (
      await getRepository(CarNumber).find().map()
    )
    res.json(carNumber);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

carnumberRouter.post("/", async (req, res) => {
  try{
    const {boardId, modelName} = req.body;
    const carNumber = new CarNumber({boardId, modelName});
    const ret = await carNumber.save();
    res.json(ret);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})

module.exports = carnumberRouter;