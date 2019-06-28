module.exports = function(sequelize, DataTypes) {
  return sequelize.define('storageDevice_has_machineInterface', {
    storageDevice_storageDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'storageDevice',
        key: 'storageDeviceID'
      }
    },
    storageDevice_machineInterfaceID: {
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
    tableName: 'storageDevice_has_machineInterface'
  });
};
