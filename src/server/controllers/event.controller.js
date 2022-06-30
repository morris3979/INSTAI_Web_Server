const { getConnection } = require("../rds/index");
const { Event } = require("../rds/model/Event");
const { CarNumber } = require("../rds/model/CarNumber");

async function getEvent() {
    const connection = await getConnection();
    const eventRepo = connection.getRepository(Event);
    const event = await eventRepo.find({
        relations: ["CarNumber", "Details"],
    });
    connection.close();
    //return new list
    return event;
}

async function getCarNumberModel(modelName) {
    const connection = await getConnection();
    const carnumberRepo = connection.getRepository(CarNumber);
    const carnumber = await carnumberRepo.find({
      relations: ["Event", "Event.Details"],
      where: {
        modelName: modelName,
      }
    });
    connection.close();
    //return new list
    return carnumber;
  }

module.exports = { getEvent, getCarNumberModel }