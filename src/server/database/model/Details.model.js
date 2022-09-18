module.exports = (sequelize, Sequelize) => {
    const Details = sequelize.define('Details', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        details: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        rawData: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        cleaned: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        labeled: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        trained: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        image: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        video: {
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
    }, {
        timestamps: true,
    });
    Details.associate = function (models) {
        Details.belongsTo(models.Event);
    };
    return Details;
};