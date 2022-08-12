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
      max: 5, //Maximum number of connection in pool
      min: 0, //Minimum number of connection in pool
      idle: 10000, //The maximum time, in milliseconds, that a connection can be idle before being released.
      acquire: 60000, //The maximum time, in milliseconds, that pool will try to get connection before throwing error.
    }
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Project = require("./model/Project.model")(sequelize, Sequelize);
db.Group = require("./model/Group.model")(sequelize, Sequelize);
db.Model = require("./model/Model.model")(sequelize, Sequelize);
db.HwUpdateLog = require("./model/HwUpdateLog.model")(sequelize, Sequelize);
db.Device = require("./model/Device.model")(sequelize, Sequelize);
db.Event = require("./model/Event.model")(sequelize, Sequelize);
db.Details = require("./model/Details.model")(sequelize, Sequelize);
db.User = require("./model/User.model")(sequelize, Sequelize);

db.Project.hasMany(db.Group, {as: "Project", foreignKey: 'ProjectId'});
db.Group.hasMany(db.Device, {as: "Group", foreignKey: 'GroupId'});
db.Model.hasMany(db.Device, {as: "Model", foreignKey: 'ModelId'});
db.Device.hasMany(db.Event, {as: "Device", foreignKey: 'DeviceId'});
db.Event.hasMany(db.Details, {as: "Event", foreignKey: 'EventId'});

db.Group.belongsTo(db.Project, {foreignKey: 'ProjectId'});
db.Device.belongsTo(db.Group, {foreignKey: 'GroupId'});
db.Device.belongsTo(db.Model, {foreignKey: 'ModelId'});
db.Event.belongsTo(db.Device, {foreignKey: 'DeviceId'});
db.Details.belongsTo(db.Event, {foreignKey: 'EventId'});

db.Device.belongsToMany(db.Model, { through: db.HwUpdateLog });
db.Model.belongsToMany(db.Device, { through: db.HwUpdateLog });

module.exports = db;