module.exports = function(sequelize, DataTypes) {
  return sequelize.define('softwareEnvironment_has_event', {
    softwareEnvironment_softwareEnvironmentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'softwareEnvironment',
        key: 'softwareEnvironmentID'
      }
    },
    event_eventID: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    tableName: 'softwareEnvironment_has_event'
  });
};
