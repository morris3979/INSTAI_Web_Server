const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.RDS_DATABASE, process.env.AWS_RDS_USERNAME, process.env.AWS_RDS_PASSWORD, {
    host: process.env.AWS_RDS_HOST,
    port: process.env.RDS_PORT,
    dialect: 'mariadb',
    logging: false,
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    },
    pool: {
      max: 10, //Maximum number of connection in pool
      min: 0, //Minimum number of connection in pool
      idle: 300000, //The maximum time, in milliseconds, that a connection can be idle before being released.
      acquire: 60000, //The maximum time, in milliseconds, that pool will try to get connection before throwing error.
    }
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Project = require("./model/Project.model")(sequelize, Sequelize);
db.Host = require("./model/Host.model")(sequelize, Sequelize);
db.HwUpdateLog = require("./model/HwUpdateLog.model")(sequelize, Sequelize);
db.Device = require("./model/Device.model")(sequelize, Sequelize);
db.Event = require("./model/Event.model")(sequelize, Sequelize);
db.Details = require("./model/Details.model")(sequelize, Sequelize);
db.User = require("./model/User.model")(sequelize, Sequelize);

db.Project.hasMany(db.User, {foreignKey: 'ProjectId'});
db.Project.hasMany(db.Host, {foreignKey: 'ProjectId'});
db.Host.hasMany(db.Device, {foreignKey: 'HostId'});
db.Device.hasMany(db.Event, {foreignKey: 'DeviceId'});
db.Device.hasMany(db.HwUpdateLog, {foreignKey: 'DeviceId'});
db.Event.hasMany(db.Details, {foreignKey: 'EventId'});

db.User.belongsTo(db.Project, {foreignKey: 'ProjectId'});
db.Host.belongsTo(db.Project, {foreignKey: 'ProjectId'});
db.Device.belongsTo(db.Host, {foreignKey: 'HostId'});
db.Event.belongsTo(db.Device, {foreignKey: 'DeviceId'});
db.HwUpdateLog.belongsTo(db.Device, {foreignKey: 'DeviceId'});
db.Details.belongsTo(db.Event, {foreignKey: 'EventId'});

// db.Device.belongsToMany(db.Model, { through: db.HwUpdateLog });
// db.Model.belongsToMany(db.Device, { through: db.HwUpdateLog });

module.exports = db;