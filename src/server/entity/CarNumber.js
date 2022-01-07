const CarNumber = require("typeorm").EntitySchema;

module.exports = new CarNumber({
    name: "Test", // Will use table name `Test` as default behaviour.
    tableName: "CarNumber", // Optional: Provide `tableName` property to override the default behaviour for table name.
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
            default: "AAA-001",
        },
        createAt: {
            type: "datetime",
            default: "2022-01-01 12:00:00",
        },
    },
    relations: {
        Details: {
            type: "one-to-many",
            target: "Details",
        },
    },
});