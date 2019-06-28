module.exports = function(sequelize, DataTypes) {
  return sequelize.define('osVersion_has_alternateID', {
    osVersion_osVersionID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'osVersion',
        key: 'osVersionID'
      }
    },
    osVersion_alternativeID: {
      type: DataTypes.STRING,
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
    tableName: 'osVersion_has_alternateID'
  });
};
