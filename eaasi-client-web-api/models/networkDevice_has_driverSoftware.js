/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('networkDevice_has_driverSoftware', {
    networkDevice_networkDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'networkDevice',
        key: 'networkDeviceID'
      }
    },
    driverSoftware_driverSoftware: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'softwareVersion',
        key: 'softwareVersionID'
      }
    }
  }, {
    tableName: 'networkDevice_has_driverSoftware'
  });
};
