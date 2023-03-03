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
      max: 100, //Maximum number of connection in pool
      min: 0, //Minimum number of connection in pool
      idle: 300000, //The maximum time, in milliseconds, that a connection can be idle before being released.
      acquire: 60000, //The maximum time, in milliseconds, that pool will try to get connection before throwing error.
    }
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Organization = require("./model/Organization.model")(sequelize, Sequelize);
db.User = require("./model/User.model")(sequelize, Sequelize);
db.UserGroup = require("./model/UserGroup.model")(sequelize, Sequelize);
db.Project = require("./model/Project.model")(sequelize, Sequelize);
db.HwUpdateLog = require("./model/HwUpdateLog.model")(sequelize, Sequelize);
db.Device = require("./model/Device.model")(sequelize, Sequelize);
db.Data = require("./model/Data.model")(sequelize, Sequelize);
db.Label = require("./model/Label.model")(sequelize, Sequelize);
db.Model = require("./model/Model.model")(sequelize, Sequelize);

// One to Many
db.Organization.hasMany(db.Project, {foreignKey: 'OrganizationId'});
db.Project.hasMany(db.Device, {foreignKey: 'ProjectId'});
db.Project.hasMany(db.Data, {foreignKey: 'ProjectId'});
db.Project.hasMany(db.Label, {foreignKey: 'ProjectId'});
db.Project.hasMany(db.Model, {foreignKey: 'ProjectId'});
db.Device.hasMany(db.Data, {foreignKey: 'DeviceId'});
db.User.hasMany(db.Project, {foreignKey: 'UserId'});
db.User.hasMany(db.Data, {foreignKey: 'UserId'});
db.Device.hasMany(db.HwUpdateLog, {foreignKey: 'DeviceId'});

// Many to One
db.Project.belongsTo(db.Organization, {foreignKey: 'OrganizationId'});
db.Device.belongsTo(db.Project, {foreignKey: 'ProjectId'});
db.Label.belongsTo(db.Project, {foreignKey: 'ProjectId'});
db.Model.belongsTo(db.Project, {foreignKey: 'ProjectId'});
db.Data.belongsTo(db.Project, {foreignKey: 'ProjectId'});
db.Data.belongsTo(db.Device, {foreignKey: 'DeviceId'});
db.Project.belongsTo(db.User, {foreignKey: 'UserId'});
db.Data.belongsTo(db.User, {foreignKey: 'UserId'});
db.HwUpdateLog.belongsTo(db.Device, {foreignKey: 'DeviceId'});

// Many to Many
db.Organization.belongsToMany(db.User, { through: db.UserGroup });
db.User.belongsToMany(db.Organization, { through: db.UserGroup });
db.Device.belongsToMany(db.Model, { through: db.HwUpdateLog });
db.Model.belongsToMany(db.Device, { through: db.HwUpdateLog });

module.exports = db;