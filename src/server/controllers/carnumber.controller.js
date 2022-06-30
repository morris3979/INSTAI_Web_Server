const { getConnection } = require("../rds/index");
const { CarNumber } = require("../rds/model/CarNumber");
const { Event } = require("../rds/model/Event");

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
    //Create, if boardId & plateNumber is existed, it will be not created.
    if (!(findBoardId)) {
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
    const deleteCarnumber = await carnumberRepo.softDelete(id);
    const eventRepo = connection.getRepository(Event);
    const deleteEvent = await eventRepo
        .createQueryBuilder()
        .where("Event.carNumberId = :carNumberId", { carNumberId: id })
        .softDelete()
        .execute();
    connection.close();
    //return new list
    return [deleteEvent, deleteCarnumber];
}

module.exports = { getCarNumbers, insertCarNumber, patchCarNumber, deleteCarNumber }