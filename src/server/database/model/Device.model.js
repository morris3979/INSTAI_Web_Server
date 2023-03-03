require('dotenv').config();

module.exports = (sequelize, Sequelize) => {
    const Device = sequelize.define('Device', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        serialNumber: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'serialNumber'
        },
        deviceName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        command: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        message: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        accessKey: {
            type: Sequelize.STRING,
            defaultValue: process.env.AWS_ACCESS_KEY_ID,
            // defaultValue: process.env.ALIYUN_ACCESS_KEY_ID,
        },
        secretKey: {
            type: Sequelize.STRING,
            defaultValue: process.env.AWS_SECRET_ACCESS_KEY,
            // defaultValue: process.env.ALIYUN_SECRET_ACCESS_KEY,
        },
        createdAt: {
            field: 'created_at',
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        updatedAt: {
            field: 'updated_at',
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        deletedAt: {
            field: 'deleted_at',
            type: Sequelize.DATE,
        },
    }, {
        timestamps: true,
        paranoid: true
    });
    Device.associate = function (models) {
        Device.belongsTo(models.Project);
        Device.hasMany(models.Data, {foreignKey: 'DeviceId'});
        // Device.hasMany(models.HwUpdateLog, {foreignKey: 'DeviceId'});
    };
    return Device;
};