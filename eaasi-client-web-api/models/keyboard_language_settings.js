/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('keyboard_language_settings', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'keyboard_language_settings'
  });
};
