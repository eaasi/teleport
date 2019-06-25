/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('os_version_display_resolution_settings', {
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
    display_resolution_settings_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'display_resolution_settings',
        key: 'id'
      }
    }
  }, {
    tableName: 'os_version_display_resolution_settings'
  });
};
