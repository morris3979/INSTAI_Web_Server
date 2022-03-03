const { getConnection } = require("../entity/db_config");
const { Details } = require("../entity/db_constructor");

async function getDetails() {
    const connection = await getConnection();
    const detailRepo = connection.getRepository(Details);
    const details = await detailRepo.find({
      relations: ["CarNumber"],
    });
    connection.close();
    //return new list
    return details;
}

async function insertDetail(startingTime, gpsState, speed, event, position) {
    const connection = await getConnection();
    //create
    const details = new Details();
    details.id = id;
    details.startingTime = startingTime;
    details.gpsState = gpsState;
    details.speed = speed;
    details.event = event;
    details.position = position;
    //save
    const detailRepo = connection.getRepository(Details);
    const allDetails = await detailRepo.find();
    await connection.getRepository(CarNumber).save(allDetails);
    connection.close();
    //return new list
    return allDetails;
}

module.exports = { getDetails, insertDetail }