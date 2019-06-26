/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('keyboardDevice_has_driverSoftware', {
    keyboardDevice_keyboardDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'keyboardDevice',
        key: 'keyboardDeviceID'
      }
    },
    keyboardDevice_driverSoftware: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'softwareVersion',
        key: 'softwareVersionID'
      }
    }
  }, {
    tableName: 'keyboardDevice_has_driverSoftware'
  });
};
