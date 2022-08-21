module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define('Model', {
      id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
      },
      modelName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      modelVersion: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      task: {
        type: Sequelize.STRING,
        defaultValue: 'object detection',
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
    return Model;
  };