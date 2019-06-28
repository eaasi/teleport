module.exports = function(sequelize, DataTypes) {
  return sequelize.define('systemRequirements_includes_gpuDevice', {
    systemRequirements_systemRequirementsID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    systemRequirements_gpuDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'gpuDevice',
        key: 'gpuDeviceID'
      }
    },
    systemRequirements_minimumGpuRAM: {
      type: DataTypes.STRING,
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
    tableName: 'systemRequirements_includes_gpuDevice'
  });
};
