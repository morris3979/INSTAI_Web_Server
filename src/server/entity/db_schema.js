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
            default: "admin"
        },
        password: {
            type: "varchar",
            default: "123456"
        },
        administrator: {
            nullable: "true",
            type: "boolean",
        },
        modelA: {
            nullable: "true",
            type: "boolean",
        },
        modelB: {
            nullable: "true",
            type: "boolean",
        },
        modelC: {
            nullable: "true",
            type: "boolean",
        },
        token: {
            nullable: "true",
            type: "varchar",
        },
        createAt: {
            type: "datetime",
            createDate: true,
            name: "created_at",
        },
        updateAt: {
            type: "datetime",
            updateDate: true,
            name: "update_at",
        },
        deleteAt: {
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
            default: "0x0001"
        },
        modelName: {
            nullable: "true",
            type: "varchar",
        },
        version: {
            nullable: "true",
            type: "varchar",
        },
        plateNumber: {
            type: "varchar",
            default: "AAA-0001"
        },
        createAt: {
            type: "datetime",
            createDate: true,
            name: "created_at",
        },
        updateAt: {
            type: "datetime",
            updateDate: true,
            name: "update_at",
        },
        deleteAt: {
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
            nullable: "true",
            type: "timestamp",
        },
        gpsState: {
            nullable: "true",
            type: "varchar",
        },
        speed: {
            nullable: "true",
            type: "int",
        },
        event: {
            nullable: "true",
            type: "varchar",
        },
        position: {
            nullable: "true",
            type: "varchar",
        },
        createAt: {
            type: "datetime",
            createDate: true,
            name: "created_at",
        },
        updateAt: {
            type: "datetime",
            updateDate: true,
            name: "update_at",
        },
        deleteAt: {
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