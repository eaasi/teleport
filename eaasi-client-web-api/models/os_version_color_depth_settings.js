/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('os_version_color_depth_settings', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    os_version_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'os_version',
        key: 'id'
      }
    },
    color_depth_settings_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'color_depth_settings',
        key: 'id'
      }
    }
  }, {
    tableName: 'os_version_color_depth_settings'
  });
};
