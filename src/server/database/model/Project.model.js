module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define('Project', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        project: {
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
    Project.associate = function (models) {
        Project.belongsTo(models.Organization);
        Project.hasMany(models.Host, {foreignKey: 'ProjectId'});
        Project.hasMany(models.Data, {foreignKey: 'ProjectId'});
    };
    return Project;
};