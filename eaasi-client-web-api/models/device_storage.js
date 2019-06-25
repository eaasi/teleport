/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('device_storage', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'device',
        key: 'id'
      }
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    volume_bytes: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    read_write_status: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'device_storage'
  });
};
