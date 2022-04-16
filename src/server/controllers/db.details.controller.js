const { getConnection } = require("../database/aws_rds_index");
const { Details } = require("../database/model/details");

async function getDetails() {
    const connection = await getConnection();
    const detailsRepo = connection.getRepository(Details);
    const details = await detailsRepo.find({
      relations: ["Event", "Event.CarNumber"],
    });
    connection.close();
    //return new list
    return details;
}

module.exports = { getDetails }