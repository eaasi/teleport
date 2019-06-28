module.exports = function(sequelize, DataTypes) {
  return sequelize.define('softwareVersion_languageSettings', {
    softwareVersion_softwareVersionID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'softwareVersion',
        key: 'softwareVersionID'
      }
    },
    softwareVersion_languageQID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    softwareVersion_defaultLanguage: {
      type: DataTypes.BOOLEAN,
      allowNull: false
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
    tableName: 'softwareVersion_languageSettings'
  });
};
