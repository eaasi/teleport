module.exports = function(sequelize, DataTypes) {
  return sequelize.define('configuredNetwork_hasEvent', {
    configuredNetwork_configuredNetworkID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'configuredNetwork',
        key: 'configuredNetworkID'
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
    tableName: 'configuredNetwork_has_event'
  });
};
