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
            allowNull: true,
        },
        description: {
            type: Sequelize.STRING,
            defaultValue: 'Data collection'
        },
        mentorship: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        updateState: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        message: {
            type: Sequelize.JSON,
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
        Device.hasMany(models.Event, {foreignKey: 'DeviceId'});
    };
    return Device;
};