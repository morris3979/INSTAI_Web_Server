const typeorm = require('typeorm');
const EntitySchema = require("typeorm").EntitySchema;
require('dotenv').config();

class CarNumber {
    constructor(id, boardId, modelName, version, driverlicense, createAt, updateAt, deleteAt) {
        this.id = id;
        this.boardId = boardId;
        this.modelName = modelName;
        this.version = version;
        this.driverlicense = driverlicense;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.deleteAt = deleteAt;
    }
}

class Details {
    constructor(id, startingTime, endTime, event, position, createAt, updateAt, deleteAt) {
        this.id = id;
        this.startingTime = startingTime;
        this.endTime = endTime;
        this.event = event;
        this.position = position;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.deleteAt = deleteAt;
    }
}

//CarNumber table
const CarNumberSchema = new EntitySchema({
    name: "CarNumber", // Will use table name `Test` as default behavior.
    tableName: "CarNumber", // Optional: Provide `tableName` property to override the default behavior for table name.
    target: CarNumber,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        boardId: {
            type: "varchar",
            default: "0x0001",
        },
        modelName: {
            type: "varchar",
            default: "A",
        },
        version: {
            type: "varchar",
            default: "0.1",
        },
        driverlicense: {
            type: "varchar",
            default: "AAA-0001",
        },
        createAt: {
            type: "datetime",
            default: "2022-01-01 12:00:00",
            name: "created_at",
        },
        updateAt: {
            type: "datetime",
            default: "2022-01-01 12:00:00",
            name: "update_at",
        },
        deleteAt: {
            type: "datetime",
            default: "2022-01-01 12:00:00",
            name: "delete_at",
        },
    },
    relations: {
        Details: {
            type: "one-to-many",
            target: "Details",
        },
    },
});

//Details table
const DetailsSchema = new EntitySchema({
    name: "Details", // Will use table name `Test` as default behavior.
    tableName: "Details", // Optional: Provide `tableName` property to override the default behavior for table name.
    target: Details,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        startingTime: {
            type: "timestamp",
            default: "2022-01-01 12:00:00",
        },
        endTime: {
            type: "timestamp",
            default: "2022-01-01 12:00:00",
        },
        event: {
            type: "varchar",
            default: "/s3/image"
        },
        position: {
            type: "varchar",
            default: "25.042884, 121.532950",
        },
        createAt: {
            type: "datetime",
            default: "2022-01-01 12:00:00",
            name: "created_at",
        },
        updateAt: {
            type: "datetime",
            default: "2022-01-01 12:00:00",
            name: "update_at",
        },
        deleteAt: {
            type: "datetime",
            default: "2022-01-01 12:00:00",
            name: "delete_at",
        },
    },
    relations: {
        CarNumber: {
            type: "many-to-one",
            target: "CarNumber",
        },
    },
});

//db config
async function getConnection() {
    return await typeorm.createConnection({
        type: "mysql",
        host: process.env.HOST,
        port: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: "test",
        synchronize: false,
        logging: false,
        entities: [
            CarNumberSchema,
            DetailsSchema
        ]
    })
}

async function getCarNumbers() {
    const connection = await getConnection();
    const carnumberRepo = connection.getRepository(CarNumber);
    const carnumbers = await carnumberRepo.find();
    connection.close();
    return carnumbers;
}

async function insertCarNumber(id, boardId, modelName, version, driverlicense) {
    const connection = await getConnection();
    //create
    const carnumber = new CarNumber();
    carnumber.id = id;
    carnumber.boardId = boardId;
    carnumber.modelName = modelName;
    carnumber.version = version;
    carnumber.driverlicense = driverlicense;
    //save
    const carnumberRepo = connection.getRepository(CarNumber);
    const res = await carnumberRepo.save(carnumber);
    console.log("save", res);
    //return new list
    const allCarnumbers = await carnumberRepo.find();
    connection.close();
    return allCarnumbers;
}

async function getDetails() {
    const connection = await getConnection();
    const detailRepo = connection.getRepository(Details);
    const details = await detailRepo.find();
    connection.close();
    return details;
}

async function insertDetail(id, startingTime, endTime, event, position) {
    const connection = await getConnection();
    //create
    const details = new Details();
    details.id = id;
    details.startingTime = startingTime;
    details.endTime = endTime;
    details.event = event;
    details.position = position;
    //save
    const detailRepo = connection.getRepository(Details);
    const res = await detailRepo.save(details);
    console.log("save", res);
    //return new list
    const allDetails = await detailRepo.find();
    connection.close();
    return allDetails;
}

module.exports = { getCarNumbers, insertCarNumber, getDetails, insertDetail };