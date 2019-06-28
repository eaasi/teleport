module.exports = function(sequelize, DataTypes) {
  return sequelize.define('displayDevice_has_displayResolution', {
    displayDevice_displayDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'displayDevice',
        key: 'displayDeviceID'
      }
    },
    availableDisplayResolution: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'displayResolution',
        key: 'displayResolutionID'
      }
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
    tableName: 'displayDevice_has_displayResolution'
  });
};
