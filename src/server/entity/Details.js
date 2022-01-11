const typeorm = require('typeorm');
const EntitySchema = require("typeorm").EntitySchema;

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

const DetailsSchema = new EntitySchema({
    name: "Test1", // Will use table name `Test` as default behavior.
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

async function getConnection() {
    return await typeorm.createConnection();
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

module.exports = { DetailsSchema, getDetails, insertDetail };