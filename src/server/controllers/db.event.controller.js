const { getConnection } = require("../entity/aws_rds_config");
const { Event } = require("../entity/db_constructor");

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