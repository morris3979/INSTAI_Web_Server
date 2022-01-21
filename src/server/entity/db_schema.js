const { User, CarNumber, Details } = require("./db_constructor");
const EntitySchema = require("typeorm").EntitySchema;

Date.prototype.toISOString = function () {
    let pad =(n)=>(n < 10)?'0' + n:n;
    let hours_offset = this.getTimezoneOffset() / 60;
    let offset_date = this.setHours(this.getHours() - hours_offset);
    let symbol = (hours_offset >= 0) ? "-" : "+";

    return this.getUTCFullYear() +
        '-' + pad(this.getUTCMonth() + 1) +
        '-' + pad(this.getUTCDate()) +
        'T' + pad(this.getUTCHours()) +
        ':' + pad(this.getUTCMinutes()) +
        ':' + pad(this.getUTCSeconds());
};

var datetime = new Date().toISOString();
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
            default: "admin"
        },
        password: {
            type: "varchar",
            default: "123",
        },
        administrator: {
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
            default: datetime,
            name: "created_at",
        },
        updateAt: {
            type: "datetime",
            default: "1970-01-01 08:00:00",
            name: "update_at",
        },
        deleteAt: {
            type: "datetime",
            default: "1970-01-01 08:00:00",
            name: "delete_at",
        },
    },
});

//CarNumber table
const CarNumberSchema = new EntitySchema({
    name: "CarNumber", // Will use table name `Test` as default behavior.
    tableName: "CarNumber", // Optional: Provide `tableName` property to override the default behavior for table name.
    target: CarNumber,
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
        plateNumber: {
            type: "varchar",
            default: "AAA-0001",
        },
        createAt: {
            type: "datetime",
            default: datetime,
            name: "created_at",
        },
        updateAt: {
            type: "datetime",
            default: "1970-01-01 08:00:00",
            name: "update_at",
        },
        deleteAt: {
            type: "datetime",
            default: "1970-01-01 08:00:00",
            name: "delete_at",
        },
    },
    relations: {
        Details: {
            type: "one-to-many",
            target: "Details",
        },
    },
});

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
        startingTime: {
            type: "timestamp",
            default: "2022-01-01 12:00:00",
        },
        gpsState: {
            type: "varchar",
            default: "GPS"
        },
        speed: {
            type: "int",
            default: "0"
        },
        stayTime: {
            type: "int",
            default: "0"
        },
        position: {
            type: "varchar",
            default: "25.042884, 121.532950",
        },
        createAt: {
            type: "datetime",
            default: datetime,
            name: "created_at",
        },
        updateAt: {
            type: "datetime",
            default: "1970-01-01 08:00:00",
            name: "update_at",
        },
        deleteAt: {
            type: "datetime",
            default: "1970-01-01 08:00:00",
            name: "delete_at",
        },
    },
    relations: {
        CarNumber: {
            type: "many-to-one",
            target: "CarNumber",
        },
    },
});


module.exports = { UserSchema, CarNumberSchema, DetailsSchema }