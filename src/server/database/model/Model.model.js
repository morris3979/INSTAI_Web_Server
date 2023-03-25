module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define('Model', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        modelName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        dataset: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        status: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        available: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
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
    Model.associate = function (models) {
        Model.belongsTo(models.Project);
        Model.belongsTo(models.User);
    };
    return Model;
};