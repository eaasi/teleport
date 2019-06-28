module.exports = function(sequelize, DataTypes) {
  return sequelize.define('osVersion_colorDepthSettings', {
    osVersion_osVersionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'osVersion',
        key: 'osVersionID'
      }
    },
    osVersion_colorDepthID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'colorDepth',
        key: 'colorDepthID'
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
    tableName: 'osVersion_colorDepthSettings'
  });
};
