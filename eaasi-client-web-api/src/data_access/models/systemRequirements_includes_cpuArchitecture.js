module.exports = function(sequelize, DataTypes) {
  return sequelize.define('systemRequirements_includes_cpuArchitecture', {
    systemRequirements_systemRequirementsID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'systemRequirements',
        key: 'systemRequirementsID'
      }
    },
    systemRequirements_cpuArchitecture: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'cpuArchitecture',
        key: 'cpuArchitectureQID'
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
    tableName: 'systemRequirements_includes_cpuArchitecture'
  });
};
