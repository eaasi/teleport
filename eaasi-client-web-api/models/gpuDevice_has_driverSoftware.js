/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('gpuDevice_has_driverSoftware', {
    gpuDevice_gpuDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'gpuDevice',
        key: 'gpuDeviceID'
      }
    },
    gpuDevice_driverSoftwareID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'softwareVersion',
        key: 'softwareVersionID'
      }
    }
  }, {
    tableName: 'gpuDevice_has_driverSoftware'
  });
};
