require('dotenv').config();

module.exports = (sequelize, Sequelize) => {
    const Device = sequelize.define('Device', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        deviceId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        deviceName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            defaultValue: 'Data collection'
        },
        command: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        message: {
            type: Sequelize.STRING,
            allowNull: true,
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
        Device.belongsTo(models.Host);
        Device.belongsTo(models.HwUpdateLog);
    };
    return Device;
};