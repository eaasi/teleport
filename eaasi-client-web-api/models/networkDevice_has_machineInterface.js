/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('networkDevice_has_machineInterface', {
    networkDevice_networkDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'networkDevice',
        key: 'networkDeviceID'
      }
    },
    networkDevice_machineInterfaceID: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'networkDevice_has_machineInterface'
  });
};
