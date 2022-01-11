const typeorm = require('typeorm');
const EntitySchema = require("typeorm").EntitySchema;

class User {
    constructor(id, user, password, proprietary, pageA, pageB, pageC, createAt, updateAt, deleteAt) {
        this.id = id;
        this.user = user;
        this.password = password;
        this.proprietary = proprietary;
        this.pageA = pageA;
        this.pageB = pageB;
        this.pageC = pageC;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.deleteAt = deleteAt;
    }
}

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
        user: {
            type: "varchar",
            default: "user"
        },
        password: {
            type: "varchar",
            default: "q123",
        },
        proprietary: {
            type: "int",
            default: "1",
        },
        pageA: {
            type: "int",
            default: "0",
        },
        pageB: {
            type: "int",
            default: "0",
        },
        pageC: {
            type: "int",
            default: "0",
        },
        createAt: {
            type: "datetime",
            default: "2022-01-01 12:00:00",
            name: "created_at",
        },
        updateAt: {
            type: "datetime",
            default: "2022-01-01 12:00:00",
            name: "update_at",
        },
        deleteAt: {
            type: "datetime",
            default: "2022-01-01 12:00:00",
            name: "delete_at",
        },
    },
});

async function getConnection() {
    return await typeorm.createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "12345678",
        database: "test",
        synchronize: true,
        logging: false,
        entities: [
            UserSchema
        ]
    })
}

async function getUsers() {
    const connection = await getConnection();
    const userRepo = connection.getRepository(User);
    const users = await userRepo.find();
    connection.close();
    return users;
}

async function insertUser(id, user, password, proprietary, pageA, pageB, pageC) {
    const connection = await getConnection();
    //create
    const users = new User();
    users.id = id;
    users.user = user;
    users.password = password;
    users.proprietary = proprietary;
    users.pageA = pageA;
    users.pageB = pageB;
    users.pageC = pageC;
    //save
    const userRepo = connection.getRepository(User);
    const res = await userRepo.save(users);
    console.log("save", res);
    //return new list
    const allUsers = await userRepo.find();
    connection.close();
    return allUsers;
}

module.exports = { UserSchema, getUsers, insertUser };