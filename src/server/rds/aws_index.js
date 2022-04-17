const typeorm = require('typeorm');
require('dotenv').config();
const { UserSchema } = require("./entity/UserSchema");
const { CarNumberSchema } = require("./entity/CarNumberSchema");
const { EventSchema } = require("./entity/EventSchema");
const { DetailsSchema } = require("./entity/DetailsSchema");

/** db config !! */
async function getConnection() {
    return await typeorm.createConnection({
        type: "mysql",
        host: process.env.AWS_RDS_HOST,
        port: process.env.AWS_RDS_PORT,
        username: process.env.AWS_RDS_USERNAME,
        password: process.env.AWS_RDS_PASSWORD,
        database: process.env.RDS_DATABASE,
        timezone: "SYSTEM",
        synchronize: true,
        migration: true,
        logging: false,
        entities: [
            UserSchema,
            CarNumberSchema,
            EventSchema,
            DetailsSchema,
        ],
        migrations: [
            "migration/*.js"
        ],
        subscribers: [
            "subscriber/*.js"
        ],
        charset: "utf8mb4_unicode_ci"
    })
}

module.exports = { getConnection }