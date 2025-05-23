module.exports = (sequelize, Sequelize) => {
    const Data = sequelize.define('Data', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        data: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        image: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        video: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        csv: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        sampling: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        annotation: {
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
    }, {
        timestamps: true,
    });
    Data.associate = function (models) {
        Data.belongsTo(models.Project);
        Data.belongsTo(models.Device);
        Data.belongsTo(models.User);
    };
    return Data;
};