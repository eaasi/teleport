module.exports = function(sequelize, DataTypes) {
  return sequelize.define('osVersion_has_programmingLanguage', {
    osVersion_osVersionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'osVersion',
        key: 'osVersionID'
      }
    },
    osVersion_programmingLanguageQID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'programmingLanguage',
        key: 'programmingLanguageQID'
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
    tableName: 'osVersion_has_programmingLanguage'
  });
};
