const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "Test", // Will use table name `Test` as default behaviour.
    tableName: "carNunber", // Optional: Provide `tableName` property to override the default behaviour for table name.
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        boardId: {
            type: "varchar"
        },
        modelName: {
            type: "varchar"
        }
    }
});