const EntitySchema = require("typeorm").EntitySchema;
const { Details } = require("../model/Details");

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
    },
    relations: {
        Event: {
            type: "many-to-one",
            target: "Event",
            joinColumn: true,
            inverseSide: 'Details'
        },
    },
});

module.exports = { DetailsSchema }