/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {configuredNetwork_emulatesNetworkServiceInstance, configuredNetwork_emulatesNetworkServiceAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<configuredNetwork_emulatesNetworkServiceInstance, configuredNetwork_emulatesNetworkServiceAttribute>('configuredNetwork_emulatesNetworkService', {
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
