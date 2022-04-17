const EntitySchema = require("typeorm").EntitySchema;
const { Event } = require("../model/Event");

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
            joinColumn: { name: "carNumberId" },
            inverseSide: 'event'
        },
        Details: {
            type: "one-to-many",
            target: "Details",
            joinColumn: { name: "detailsId" },
            cascade: true,
            inverseSide: 'event'
        },
    },
});

module.exports = { EventSchema }