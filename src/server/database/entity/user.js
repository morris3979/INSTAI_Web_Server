const EntitySchema = require("typeorm").EntitySchema;
const { User } = require("../model/user");

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

module.exports = { UserSchema }