/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {configuredGpuDevice_has_displayDeviceInstance, configuredGpuDevice_has_displayDeviceAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<configuredGpuDevice_has_displayDeviceInstance, configuredGpuDevice_has_displayDeviceAttribute>('configuredGpuDevice_has_displayDevice', {
    configuredMachine_machineID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    configuredGpuDevice_gpuDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'configuredGpuDevice',
        key: 'configuredGpuDevice_gpuDeviceID'
      }
    },
    configuredGpuDevice_displayDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'displayDevice',
        key: 'displayDeviceID'
      }
    },
    displayDevice_usesDisplayInterface: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'configuredGpuDevice_has_displayDevice'
  });
};
