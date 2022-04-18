const EntitySchema = require("typeorm").EntitySchema;
const { CarNumber } = require("../model/CarNumber");

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
            target: "Event",
            cascade: true,
            inverseSide: 'CarNumber'
        },
    },
});

module.exports = { CarNumberSchema }