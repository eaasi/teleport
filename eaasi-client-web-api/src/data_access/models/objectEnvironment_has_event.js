module.exports = function(sequelize, DataTypes) {
  return sequelize.define('objectEnvironment_has_event', {
    objectEnvironment_objectEnvironment_computingEnvironmentID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'objectEnvironment',
        key: 'objectEnvironment_objectEnvironment_computingEnvironmentID'
      }
    },
    objectEnvironment_objectEnvironment_digitalObjectID: {
      type: DataTypes.INTEGER,
      allowNull: true
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
    tableName: 'objectEnvironment_has_event'
  });
};
