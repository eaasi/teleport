module.exports = function(sequelize, DataTypes) {
  return sequelize.define('softwareFamilyVersion_hasPart_softwareVersion', {
    softwareFamilyVersionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'softwareVersion',
        key: 'softwareVersionID'
      }
    },
    hasPart_softwareVersion: {
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
    tableName: 'softwareFamilyVersion_hasPart_softwareVersion'
  });
};
