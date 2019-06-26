/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {configuredNetworkMachine_expectedNetworkServiceInstance, configuredNetworkMachine_expectedNetworkServiceAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<configuredNetworkMachine_expectedNetworkServiceInstance, configuredNetworkMachine_expectedNetworkServiceAttribute>('configuredNetworkMachine_expectedNetworkService', {
    configuredNetworkMachine_configuredNetworkID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    configuredNetworkMachine_configuredMachineID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'configuredNetwork_has_configuredMachine',
        key: 'configuredNetwork_machineID'
      }
    },
    configuredNetworkMachine_expectedNetworkServiceID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'networkService',
        key: 'networkServiceID'
      }
    },
    servicePortExpected: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'configuredNetworkMachine_expectedNetworkService'
  });
};
