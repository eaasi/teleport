/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('os_version_device', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    os_version_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'os_version',
        key: 'id'
      }
    },
    device_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'device',
        key: 'id'
      }
    }
  }, {
    tableName: 'os_version_device'
  });
};
