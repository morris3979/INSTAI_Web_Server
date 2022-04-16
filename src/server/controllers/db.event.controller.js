const { getConnection } = require("../entity/aws_rds_config");
const { Event } = require("../entity/db_model");

async function getEvent() {
    const connection = await getConnection();
    const eventRepo = connection.getRepository(Event);
    const event = await eventRepo.find({
      relations: ["CarNumber", "Details.Event"],
    });
    connection.close();
    //return new list
    return event;
}

module.exports = { getEvent }