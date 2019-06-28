module.exports = function(sequelize, DataTypes) {
  return sequelize.define('systemRequirements_includes_audioDevice', {
    systemRequirements_systemRequirementsID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'systemRequirements',
        key: 'systemRequirementsID'
      }
    },
    systemRequirements_audioDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'audioDevice',
        key: 'audioDeviceID'
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
    tableName: 'systemRequirements_includes_audioDevice'
  });
};
