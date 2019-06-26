/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('configuredMachine', {
    configuredMachineID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    configuredMachineName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    configuredMachineDescription: {
      type: DataTypes.STRING,
      allowNull: false
    },
    configuredMachineDateTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    configuredMachineType: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'machineType',
        key: 'machineTypeID'
      }
    },
    configuredMachineRamBytes: {
      type: DataTypes.STRING,
      allowNull: false
    },
    configuredMachineArchitecture: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'cpuArchitecture',
        key: 'cpuArchitectureQID'
      }
    },
    configuredMachineCpuCores: {
      type: DataTypes.STRING,
      allowNull: true
    },
    configuredMachine_emulatorSoftwareID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'softwareVersion',
        key: 'softwareVersionID'
      }
    }
  }, {
    tableName: 'configuredMachine'
  });
};
