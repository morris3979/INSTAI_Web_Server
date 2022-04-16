const { getConnection } = require("../database/aws_rds_index");
const { Event } = require("../database/model/event");

async function getEvent() {
    const connection = await getConnection();
    const eventRepo = connection.getRepository(Event);
    const event = await eventRepo.find({
      relations: ["CarNumber"],
    });
    connection.close();
    //return new list
    return event;
}

module.exports = { getEvent }