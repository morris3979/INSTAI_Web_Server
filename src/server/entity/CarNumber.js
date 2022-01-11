const typeorm = require('typeorm');
const EntitySchema = require("typeorm").EntitySchema;

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

async function getConnection() {
    return await typeorm.createConnection();
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

module.exports = { CarNumberSchema, getCarNumbers, insertCarNumber };