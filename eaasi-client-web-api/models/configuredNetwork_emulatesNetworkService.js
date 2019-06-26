/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('configuredNetwork_emulatesNetworkService', {
    configuredNetwork_configuredNetworkID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'configuredNetwork',
        key: 'configuredNetworkID'
      }
    },
    configuredNetwork_networkServiceID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'networkService',
        key: 'networkServiceID'
      }
    },
    servicePortExposed: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'configuredNetwork_emulatesNetworkService'
  });
};
