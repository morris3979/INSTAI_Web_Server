const { getConnection } = require("../entity/aws_rds_config");
const { Details } = require("../entity/db_constructor");

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