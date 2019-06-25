/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('device_display', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'device',
        key: 'id'
      }
    },
    resolutions: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    color_depth: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    display_interface: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'device_display'
  });
};
