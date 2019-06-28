module.exports = function(sequelize, DataTypes) {
  return sequelize.define('softwareObject_has_event', {
    softwareObject_softwareObjectID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'softwareObject',
        key: 'softwareObjectID'
      }
    },
    event_eventID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'softwareObject_has_event'
  });
};
