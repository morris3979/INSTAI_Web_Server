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
        },
    },
    relations: {
        CarNumber: {
            type: "many-to-one",
            target: "CarNumber",
        },
    },
});