/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {configuredNetworkDeviceInstance, configuredNetworkDeviceAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<configuredNetworkDeviceInstance, configuredNetworkDeviceAttribute>('configuredNetworkDevice', {
    configuredMachine_machineID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'configuredMachine',
        key: 'configuredMachineID'
      }
    },
    configuredNetworkDevice_networkDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'networkDevice',
        key: 'networkDeviceID'
      }
    },
    configuredNetworkDevice_macAddress: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    configuredNetworkDevice_usesMachineInterface: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'configuredNetworkDevice'
  });
};
