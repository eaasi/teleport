module.exports = function(sequelize, DataTypes) {
  return sequelize.define('softwareType', {
    softwareTypeQID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    softwareTypeName: {
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
    tableName: 'softwareType'
  });
};
