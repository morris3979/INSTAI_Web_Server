const typeorm = require('typeorm');
require('dotenv').config();
const { UserSchema, CarNumberSchema, EventSchema, DetailsSchema } = require("./db_schema");

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
        synchronize: false,
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