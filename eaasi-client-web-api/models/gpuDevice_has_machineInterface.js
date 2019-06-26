/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('gpuDevice_has_machineInterface', {
    gpuDevice_gpuDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'gpuDevice',
        key: 'gpuDeviceID'
      }
    },
    gpuDevice_machineInterfaceID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'gpuDevice_has_machineInterface'
  });
};
