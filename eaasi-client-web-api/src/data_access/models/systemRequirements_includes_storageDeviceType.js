module.exports = function(sequelize, DataTypes) {
  return sequelize.define('systemRequirements_includes_storageDeviceType', {
    systemRequirements_systemRequirementsID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'systemRequirements',
        key: 'systemRequirementsID'
      }
    },
    systemRequirements_storageDeviceTypeID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'storageDeviceType',
        key: 'storageDeviceTypeID'
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
    tableName: 'systemRequirements_includes_storageDeviceType'
  });
};
