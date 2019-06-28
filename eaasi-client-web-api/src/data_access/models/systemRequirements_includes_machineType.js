module.exports = function(sequelize, DataTypes) {
  return sequelize.define('systemRequirements_includes_machineType', {
    systemRequirements_systemRequirementsID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'systemRequirements',
        key: 'systemRequirementsID'
      }
    },
    systemRequirements_machineTypeID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'machineType',
        key: 'machineTypeID'
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
    tableName: 'systemRequirements_includes_machineType'
  });
};
