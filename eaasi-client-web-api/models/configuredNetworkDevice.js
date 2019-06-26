/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('configuredNetworkDevice', {
    configuredMachine_machineID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'configuredMachine',
        key: 'configuredMachineID'
      }
    },
    configuredNetworkDevice_networkDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'networkDevice',
        key: 'networkDeviceID'
      }
    },
    configuredNetworkDevice_macAddress: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    configuredNetworkDevice_usesMachineInterface: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'configuredNetworkDevice'
  });
};
