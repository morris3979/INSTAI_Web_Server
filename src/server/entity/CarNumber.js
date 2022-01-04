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
        },
        modelName: {
            type: "varchar",
        },
        version: {
            type: "varchar",
        },
        driverlicense: {
            type: "varchar",
        },
        creareAt: {
            type: "datetime",
        },
    },
    relations: {
        Details: {
            type: "one-to-many",
            target: "Details",
        },
    },
});