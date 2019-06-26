/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('displayDevice', {
    displayDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    displayDeviceQID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    displayDeviceName: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'displayDevice'
  });
};
