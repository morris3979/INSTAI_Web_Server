const EntitySchema = require("typeorm").EntitySchema;
const { User } = require("../model/User");

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
            type: "boolean",
            default: false,
        },
        authA: {
            type: "boolean",
            default: false,
        },
        authB: {
            type: "boolean",
            default: false,
        },
        authC: {
            type: "boolean",
            default: false,
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

module.exports = { UserSchema }