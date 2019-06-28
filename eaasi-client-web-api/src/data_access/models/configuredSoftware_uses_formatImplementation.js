module.exports = function(sequelize, DataTypes) {
  return sequelize.define('configuredSoftware_uses_formatImplementation', {
    configuredSoftware_configuredSoftwareManifestationID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'configuredSoftware',
        key: 'configuredSoftwareVersionID'
      }
    },
    configuredSoftware_formatImplementation: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'formatImplementation',
        key: 'formatImplementationID'
      }
    },
    configuredFormatOperation: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'formatOperation',
        key: 'operationID'
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
    tableName: 'configuredSoftware_uses_formatImplementation'
  });
};
