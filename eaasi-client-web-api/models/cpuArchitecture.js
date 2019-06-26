/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cpuArchitecture', {
    cpuArchitectureQID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    cpuArchitectureName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'cpuArchitecture'
  });
};
