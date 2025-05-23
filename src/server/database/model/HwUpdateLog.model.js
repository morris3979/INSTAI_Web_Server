module.exports = (sequelize, Sequelize) => {
    const HwUpdateLog = sequelize.define('HwUpdateLog', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
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
    return HwUpdateLog;
};