const { getConnection } = require("../entity/db_config");
const { CarNumber } = require("../entity/db_constructor");

async function getCarNumbers() {
    const connection = await getConnection();
    const carnumberRepo = connection.getRepository(CarNumber);
    const carnumbers = await carnumberRepo.find();
    connection.close();
    //return new list
    return carnumbers;
}

async function insertCarNumber(boardId, modelName, version, plateNumber) {
    const connection = await getConnection();
    const findBoardId = await connection.getRepository(CarNumber).findOne({
      boardId: boardId,
    });
    const findPlateNumber = await connection.getRepository(CarNumber).findOne({
      plateNumber: plateNumber,
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
    const existed = "Already Exist";
    connection.close();
    return existed;
}

async function patchCarNumber(id, boardId, modelName, version, plateNumber) {
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
      res.status(404).send("Not Found");
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

async function deleteCarNumber(id) {
    const connection = await getConnection();
    //delete
    const carnumberRepo = connection.getRepository(CarNumber);
    const allCarnumbers = await carnumberRepo.softDelete(id);
    connection.close();
    //return new list
    return allCarnumbers;
}

module.exports = { getCarNumbers, insertCarNumber, patchCarNumber, deleteCarNumber }