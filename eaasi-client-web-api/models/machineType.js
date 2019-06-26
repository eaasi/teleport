/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('machineType', {
    machineTypeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    machineTypeName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'machineType'
  });
};
