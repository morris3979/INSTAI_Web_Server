const { getConnection } = require("../index");
const { Event } = require("../model/Event");

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

module.exports = { getEvent }