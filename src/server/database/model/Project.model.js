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
      // defaultValue: 'projectA'
    },
    displayName: {
      type: Sequelize.STRING,
      // defaultValue: '工廠Ａ'
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
  return Project;
};