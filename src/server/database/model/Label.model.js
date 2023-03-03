module.exports = (sequelize, Sequelize) => {
    const Label = sequelize.define('Label', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        labelClass: {
          type: Sequelize.STRING,
          allowNull: false,
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
        paranoid: true
    });
    Label.associate = function (models) {
        Label.belongsTo(models.Project);
    };
    return Label;
};