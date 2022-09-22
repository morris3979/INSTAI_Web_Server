module.exports = (sequelize, Sequelize) => {
    const Host = sequelize.define('Host', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        serialNumber: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        device: {
          type: Sequelize.STRING,
          defaultValue: 'Raspberry Pi',
        },
        type: {
          type: Sequelize.STRING,
          defaultValue: 'OTADevice',
        },
        response: {
          type: Sequelize.JSON,
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
    Host.associate = function (models) {
        Host.belongsTo(models.Project);
        Host.hasMany(models.Device, {foreignKey: 'HostId'});
    };
    return Host;
};