/* jshint indent: 2 */

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
    }
  }, {
    tableName: 'region'
  });
};
