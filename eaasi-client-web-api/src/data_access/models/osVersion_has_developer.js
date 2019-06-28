module.exports = function(sequelize, DataTypes) {
  return sequelize.define('osVersion_has_developer', {
    osVersion_osVersionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'osVersion',
        key: 'osVersionID'
      }
    },
    osVersion_developerQID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'developer',
        key: 'developerQID'
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
    tableName: 'osVersion_has_developer'
  });
};
