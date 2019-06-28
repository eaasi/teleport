module.exports = function(sequelize, DataTypes) {
  return sequelize.define('configuredPointerDevice', {
    configuredMachine_machineID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'configuredMachine',
        key: 'configuredMachineID'
      }
    },
    configuredPointerDevice_pointerDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pointerDevice',
        key: 'pointerDeviceID'
      }
    },
    configuredPointerDevice_usesMachineInterface: {
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
    tableName: 'configuredPointerDevice'
  });
};
