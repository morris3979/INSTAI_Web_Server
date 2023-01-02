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

db.Organization = require("./model/Organization.model")(sequelize, Sequelize);
db.User = require("./model/User.model")(sequelize, Sequelize);
db.Project = require("./model/Project.model")(sequelize, Sequelize);
db.Host = require("./model/Host.model")(sequelize, Sequelize);
db.HwUpdateLog = require("./model/HwUpdateLog.model")(sequelize, Sequelize);
db.Device = require("./model/Device.model")(sequelize, Sequelize);
db.Data = require("./model/Data.model")(sequelize, Sequelize);
db.Label = require("./model/Label.model")(sequelize, Sequelize);
db.LabelGroup = require("./model/LabelGroup.model")(sequelize, Sequelize);

db.Organization.hasMany(db.User, {foreignKey: 'OrganizationId'});
db.Organization.hasMany(db.Project, {foreignKey: 'OrganizationId'});
db.Project.hasMany(db.Host, {foreignKey: 'ProjectId'});
db.Host.hasMany(db.Device, {foreignKey: 'HostId'});
db.Device.hasMany(db.Data, {foreignKey: 'DeviceId'});
db.Device.hasMany(db.HwUpdateLog, {foreignKey: 'DeviceId'});

db.User.belongsTo(db.Organization, {foreignKey: 'OrganizationId'});
db.Project.belongsTo(db.Organization, {foreignKey: 'OrganizationId'});
db.Host.belongsTo(db.Project, {foreignKey: 'ProjectId'});
db.Device.belongsTo(db.Host, {foreignKey: 'HostId'});
db.Data.belongsTo(db.Device, {foreignKey: 'DeviceId'});
db.HwUpdateLog.belongsTo(db.Device, {foreignKey: 'DeviceId'});

db.Label.belongsToMany(db.Project, { through: db.LabelGroup });
db.Project.belongsToMany(db.Label, { through: db.LabelGroup });

module.exports = db;