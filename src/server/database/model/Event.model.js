module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define('Event', {
      id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
      },
      eventTime: {
        type: "TIMESTAMP",
        allowNull: false,
      },
      trigger: {
        type: Sequelize.BOOLEAN,
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
    }, {
      timestamps: true,
    });
    return Event;
  };