/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('os_version_keyboard_language_settings', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    keyboard_language_settings_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'keyboard_layout_settings',
        key: 'id'
      }
    },
    os_version_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'os_version',
        key: 'id'
      }
    }
  }, {
    tableName: 'os_version_keyboard_language_settings'
  });
};
