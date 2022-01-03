const { Router } = require('express');
const { createConnection , getRepository } = require('typeorm');
const carnumberRouter = Router({});

const {CarNumber} = require('../entity/CarNumber');


carnumberRouter.get('/', async(req, res) => {
  try{
    // let carNumber = (
    //   await getRepository(CarNumber)
    // );
    res.json(CarNumber);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

carnumberRouter.post("/", async (req, res) => {
  try{
    let carnumber = await getRepository(CarNumber).findOne({
      boardId: req.body.carnumber.boardId,
    });

    // let carnumber = new CarNumber;
    // carnumber.boardId = req.body.carnumber.boardId;
    // carnumber.modelName = req.body.carnumber.modelName;
    const newcarNumber = await getRepository(CarNumber).save(carnumber);
    res.status(200).json();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})

module.exports = carnumberRouter;