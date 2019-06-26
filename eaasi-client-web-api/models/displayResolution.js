/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('displayResolution', {
    displayResolutionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    displayResolutionName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'displayResolution'
  });
};
