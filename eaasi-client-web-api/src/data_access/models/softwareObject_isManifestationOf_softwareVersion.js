module.exports = function(sequelize, DataTypes) {
  return sequelize.define('softwareObject_isManifestationOf_softwareVersion', {
    softwareObject_softwareObjectID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'softwareObject',
        key: 'softwareObjectID'
      }
    },
    softwareObject_softwareVersionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'softwareVersion',
        key: 'softwareVersionID'
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
    tableName: 'softwareObject_isManifestationOf_softwareVersion'
  });
};
