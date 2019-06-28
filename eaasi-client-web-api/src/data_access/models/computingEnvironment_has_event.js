module.exports = function(sequelize, DataTypes) {
  return sequelize.define('computingEnvironment_has_event', {
    computingEnvironment_computingEnvironmentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'computingEnvironment',
        key: 'computingEnvironmentID'
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
    tableName: 'computingEnvironment_has_event'
  });
};
