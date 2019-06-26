/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('audioDevice', {
    audioDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    audioDeviceQID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    audioDeviceName: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'audioDevice'
  });
};
