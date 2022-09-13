module.exports = (sequelize, Sequelize) => {
    const Group = sequelize.define('Group', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        groupName: {
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
        deletedAt: {
            field: 'deleted_at',
            type: Sequelize.DATE,
        },
    }, {
        timestamps: true,
        paranoid: true
    });
    Group.associate = function (models) {
        Group.hasMany(models.Device, {foreignKey: 'GroupId'});
    };
    return Group;
};