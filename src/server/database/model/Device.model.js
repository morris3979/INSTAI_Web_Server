require('dotenv').config();

module.exports = (sequelize, Sequelize) => {
    const Device = sequelize.define('Device', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        boardId: {
            type: Sequelize.STRING,
        },
        deviceName: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
        mentorship: {
            type: Sequelize.BOOLEAN,
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
        updateState: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        message: {
            type: Sequelize.STRING,
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
        Device.belongsTo(models.Group);
    };
    return Device;
    };