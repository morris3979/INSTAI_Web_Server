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
        },
        image: {
            type: Sequelize.BOOLEAN,
        },
        video: {
            type: Sequelize.BOOLEAN,
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
        return Details;
    };