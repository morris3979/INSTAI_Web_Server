const { User, CarNumber, Event, Details } = require("./db_constructor");
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
        },
        password: {
            type: "varchar",
        },
        admin: {
            nullable: "true",
            type: "boolean",
        },
        authA: {
            nullable: "true",
            type: "boolean",
        },
        authB: {
            nullable: "true",
            type: "boolean",
        },
        authC: {
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
            nullable: "true",
            type: "varchar",
        },
        accessKey: {
            default: "AKIAZW72FNAUQH6DA46E",
            type: "varchar",
        },
        secretKey: {
            default: "yCdBApwib4xCt77vg7L3MYP/2AnU3qy1HTG9th8e",
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
        Event: {
            type: "one-to-many",
            cascade: true,
            target: "Event",
            inverseSide: 'carnumber'
        },
    },
});

//Event table
const EventSchema = new EntitySchema({
    name: "Event", // Will use table name `Test` as default behavior.
    tableName: "Event", // Optional: Provide `tableName` property to override the default behavior for table name.
    target: Event,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        eventTime: {
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
        stayTime: {
            nullable: "true",
            type: "int",
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
            joinColumn: 'carnumber_id',
            inverseSide: 'event'
        },
        Details: {
            type: "one-to-many",
            cascade: true,
            target: "Details",
            inverseSide: 'event'
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
        details: {
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
        Event: {
            type: "many-to-one",
            target: "Event",
            joinColumn: 'event_id',
            inverseSide: 'details'
        },
    },
});

module.exports = { UserSchema, CarNumberSchema, EventSchema, DetailsSchema }