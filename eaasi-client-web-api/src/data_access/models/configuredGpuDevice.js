module.exports = function(sequelize, DataTypes) {
  return sequelize.define('configuredGpuDevice', {
    configuredMachine_machineID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'configuredMachine',
        key: 'configuredMachineID'
      }
    },
    configuredGpuDevice_gpuDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'gpuDevice',
        key: 'gpuDeviceID'
      }
    },
    configuredGpuDevice_memoryBytes: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    configuredGpuDevice_irq: {
      type: DataTypes.STRING,
      allowNull: true
    },
    configuredGpuDevice_usesMachineInterface: {
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
    tableName: 'configuredGpuDevice'
  });
};
