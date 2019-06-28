module.exports = function(sequelize, DataTypes) {
  return sequelize.define('region', {
    regionQID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    regionName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    iso31661_numericCode: {
      type: DataTypes.INTEGER,
      allowNull: true
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
    tableName: 'region'
  });
};
