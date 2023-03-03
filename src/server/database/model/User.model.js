module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'email'
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        admin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        user: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        token: {
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
    User.associate = function (models) {
        User.hasMany(models.Project, {foreignKey: 'UserId'});
        User.hasMany(models.Data, {foreignKey: 'UserId'});
    };
    return User;
};