/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('display_resolution_settings', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    resolution: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'display_resolution_settings'
  });
};
