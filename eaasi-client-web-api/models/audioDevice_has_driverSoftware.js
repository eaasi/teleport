/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('audioDevice_has_driverSoftware', {
    audioDevice_audioDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'audioDevice',
        key: 'audioDeviceID'
      }
    },
    audioDevice_driverSoftwareID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'softwareVersion',
        key: 'softwareVersionID'
      }
    }
  }, {
    tableName: 'audioDevice_has_driverSoftware'
  });
};
