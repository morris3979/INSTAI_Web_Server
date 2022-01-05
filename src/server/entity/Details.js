const Details = require("typeorm").EntitySchema;

module.exports = new Details({
    name: "Test1", // Will use table name `Test` as default behaviour.
    tableName: "Details", // Optional: Provide `tableName` property to override the default behaviour for table name.
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        startingTime: {
            type: "timestamp",
        },
        endTime: {
            type: "timestamp",
        },
        event: {
            type: "varchar",
        },
        position: {
            type: "varchar",
        },
        creareAt: {
            type: "datetime",
        },
    },
    relations: {
        CarNumber: {
            type: "many-to-one",
            target: "CarNumber",
        },
    },
});