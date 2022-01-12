const typeorm = require('typeorm');
const EntitySchema = require("typeorm").EntitySchema;
require('dotenv').config();

class CarNumber {
    constructor(id, boardId, modelName, version, plateNumber, createAt, updateAt, deleteAt) {
        this.id = id;
        this.boardId = boardId;
        this.modelName = modelName;
        this.version = version;
        this.plateNumber = plateNumber;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.deleteAt = deleteAt;
    }
}

class Details {
    constructor(id, startingTime, gpsState, speed, stayTime, position, createAt, updateAt, deleteAt) {
        this.id = id;
        this.startingTime = startingTime;
        this.gpsState = gpsState;
        this.speed = speed;
        this.stayTime = stayTime;
        this.position = position;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.deleteAt = deleteAt;
    }
}

class User {
    constructor(id, user, password, proprietary, pageA, pageB, pageC, createAt, updateAt, deleteAt) {
        this.id = id;
        this.user = user;
        this.password = password;
        this.proprietary = proprietary;
        this.pageA = pageA;
        this.pageB = pageB;
        this.pageC = pageC;
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
        plateNumber: {
            type: "varchar",
            default: "AAA-0001",
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
        gpsState: {
            type: "varchar",
            default: "GPS"
        },
        speed: {
            type: "int",
            default: "0"
        },
        stayTime: {
            type: "int",
            default: "0"
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

//User table
var datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
const UserSchema = new EntitySchema({
    name: "User", // Will use table name `Test` as default behavior.
    tableName: "User", // Optional: Provide `tableName` property to override the default behavior for table name.
    target: User,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        user: {
            type: "varchar",
            default: "user"
        },
        password: {
            type: "varchar",
            default: "q123",
        },
        proprietary: {
            type: "int",
            default: "1",
        },
        pageA: {
            type: "int",
            default: "0",
        },
        pageB: {
            type: "int",
            default: "0",
        },
        pageC: {
            type: "int",
            default: "0",
        },
    },
    CreateDateColumn: {
        createAt: {
            type: "datetime",
            name: "created_at",
            default: "2022-01-01 12:00:00",
            precision: null,
        },
    },
    UpdateDateColumn: {
        updateAt: {
            type: "datetime",
            name: "update_at",
            default: "2022-01-01 12:00:00",
            precision: null,
        },
    },
});

/** db config !! */
async function getConnection() {
    return await typeorm.createConnection({
        type: "mysql",
        host: process.env.HOST,
        port: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: "test",
        synchronize: true,
        logging: false,
        entities: [
            CarNumberSchema,
            DetailsSchema,
            UserSchema
        ]
    })
}

//CarNumber--------------------
async function getCarNumbers() {
    const connection = await getConnection();
    const carnumberRepo = connection.getRepository(CarNumber);
    const carnumbers = await carnumberRepo.find();
    connection.close();
    return carnumbers;
}

async function insertCarNumber(id, boardId, modelName, version, plateNumber) {
    const connection = await getConnection();
    //create
    const carnumber = new CarNumber();
    carnumber.id = id;
    carnumber.boardId = boardId;
    carnumber.modelName = modelName;
    carnumber.version = version;
    carnumber.plateNumber = plateNumber;
    //save
    const carnumberRepo = connection.getRepository(CarNumber);
    const res = await carnumberRepo.save(carnumber);
    console.log("save", res);
    //return new list
    const allCarnumbers = await carnumberRepo.find();
    connection.close();
    return allCarnumbers;
}

//Details--------------------
async function getDetails() {
    const connection = await getConnection();
    const detailRepo = connection.getRepository(Details);
    const details = await detailRepo.find();
    connection.close();
    return details;
}

async function insertDetail(id, startingTime, gpsState, speed, stayTime, position) {
    const connection = await getConnection();
    //create
    const details = new Details();
    details.id = id;
    details.startingTime = startingTime;
    details.gpsState = gpsState;
    details.speed = speed;
    details.stayTime = stayTime;
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

//Users--------------------
async function getUsers() {
    const connection = await getConnection();
    const userRepo = connection.getRepository(User);
    const users = await userRepo.find();
    connection.close();
    return users;
}

async function insertUser(id, user, password, proprietary, pageA, pageB, pageC) {
    const connection = await getConnection();
    //create
    const users = new User();
    users.id = id;
    users.user = user;
    users.password = password;
    users.proprietary = proprietary;
    users.pageA = pageA;
    users.pageB = pageB;
    users.pageC = pageC;
    //save
    const userRepo = connection.getRepository(User);
    const res = await userRepo.save(users);
    console.log("save", res);
    //return new list
    const allUsers = await userRepo.find();
    connection.close();
    return allUsers;
}

module.exports = { getCarNumbers, insertCarNumber, getDetails, insertDetail, getUsers, insertUser };