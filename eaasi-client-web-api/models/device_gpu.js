/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('device_gpu', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'device',
        key: 'id'
      }
    },
    display_interface: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'device_gpu'
  });
};
