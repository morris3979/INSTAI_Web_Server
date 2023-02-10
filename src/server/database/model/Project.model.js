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
        type: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        accessAuth: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
        collect: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
        },
        clean: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        label: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        train: {
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
    Project.associate = function (models) {
        Project.belongsTo(models.Organization);
        Project.belongsTo(models.User);
        Project.hasMany(models.Device, {foreignKey: 'ProjectId'});
        Project.hasMany(models.Data, {foreignKey: 'ProjectId'});
        Project.hasMany(models.Label, {foreignKey: 'ProjectId'});
    };
    return Project;
};