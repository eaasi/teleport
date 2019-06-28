module.exports = function(sequelize, DataTypes) {
  return sequelize.define('developer', {
    developerQID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    developerName: {
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
    tableName: 'developer'
  });
};
