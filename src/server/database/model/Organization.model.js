module.exports = (sequelize, Sequelize) => {
    const Organization = sequelize.define('Organization', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        organization: {
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
    Organization.associate = function (models) {
        Organization.hasMany(models.Project, {foreignKey: 'OrganizationId'});
        Organization.hasMany(models.User, {foreignKey: 'OrganizationId'});
    };
    return Organization;
};