/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {configuredNetwork_has_configuredMachineInstance, configuredNetwork_has_configuredMachineAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<configuredNetwork_has_configuredMachineInstance, configuredNetwork_has_configuredMachineAttribute>('configuredNetwork_has_configuredMachine', {
    configuredNetwork_configuredNetworkID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'configuredNetwork',
        key: 'configuredNetworkID'
      }
    },
    configuredNetwork_machineID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'configuredMachine',
        key: 'configuredMachineID'
      }
    },
    bootOrder: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    staticIpAddress: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'configuredNetwork_has_configuredMachine'
  });
};
