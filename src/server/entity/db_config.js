const typeorm = require('typeorm');
require('dotenv').config();
const { UserSchema, CarNumberSchema, DetailsSchema } = require("./db_schema");

/** db config !! */
async function getConnection() {
    return await typeorm.createConnection({
        type: "mysql",
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        synchronize: false,
        migration: true,
        logging: false,
        entities: [
            UserSchema,
            CarNumberSchema,
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