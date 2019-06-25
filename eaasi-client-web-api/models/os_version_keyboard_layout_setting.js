/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('os_version_keyboard_layout_setting', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    layout_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    layout_language_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'keyboard_language_settings',
        key: 'id'
      }
    },
    os_version_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'os_version',
        key: 'id'
      }
    },
    keyboard_layout_settings_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'keyboard_layout_settings',
        key: 'id'
      }
    }
  }, {
    tableName: 'os_version_keyboard_layout_setting'
  });
};
