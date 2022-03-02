const { User, CarNumber, Details } = require("./db_constructor");
const EntitySchema = require("typeorm").EntitySchema;

//User table
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
        username: {
            type: "varchar",
            default: "null"
        },
        password: {
            type: "varchar",
            default: "null",
        },
        administrator: {
            type: "boolean",
            default: false,
        },
        modelA: {
            type: "boolean",
            default: false,
        },
        modelB: {
            type: "boolean",
            default: false,
        },
        modelC: {
            type: "boolean",
            default: false,
        },
        createAt: {
            type: "datetime",
            createDate: true,
            name: "created_at",
        },
        updateAt: {
            nullable: "true",
            type: "datetime",
            updateDate: true,
            name: "update_at",
        },
        deleteAt: {
            nullable: "true",
            type: "datetime",
            deleteDate: true,
            name: "delete_at",
        },
    },
});

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
        createAt: {
            type: "datetime",
            createDate: true,
            name: "created_at",
        },
        updateAt: {
            nullable: "true",
            type: "datetime",
            updateDate: true,
            name: "update_at",
        },
        deleteAt: {
            nullable: "true",
            type: "datetime",
            deleteDate: true,
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
        gpsState: {
            type: "varchar",
            default: "GPS"
        },
        speed: {
            type: "int",
            default: "0"
        },
        event: {
            type: "varchar",
            default: "AAA"
        },
        position: {
            type: "varchar",
            default: "25.042884, 121.532950",
        },
        createAt: {
            type: "datetime",
            createDate: true,
            name: "created_at",
        },
        updateAt: {
            nullable: "true",
            type: "datetime",
            updateDate: true,
            name: "update_at",
        },
        deleteAt: {
            nullable: "true",
            type: "datetime",
            deleteDate: true,
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


module.exports = { UserSchema, CarNumberSchema, DetailsSchema }