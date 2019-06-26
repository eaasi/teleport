/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {configuredStorageDeviceInstance, configuredStorageDeviceAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<configuredStorageDeviceInstance, configuredStorageDeviceAttribute>('configuredStorageDevice', {
    configuredMachine_machineID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'configuredMachine',
        key: 'configuredMachineID'
      }
    },
    configureStorageDevice_storageDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'storageDevice',
        key: 'storageDeviceID'
      }
    },
    configuredStorageDevice_usesMachineInterface: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    configuredStorageDevice_idBootOrder: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'configuredStorageDevice'
  });
};
