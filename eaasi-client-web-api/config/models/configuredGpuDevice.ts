/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {configuredGpuDeviceInstance, configuredGpuDeviceAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<configuredGpuDeviceInstance, configuredGpuDeviceAttribute>('configuredGpuDevice', {
    configuredMachine_machineID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'configuredMachine',
        key: 'configuredMachineID'
      }
    },
    configuredGpuDevice_gpuDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'gpuDevice',
        key: 'gpuDeviceID'
      }
    },
    configuredGpuDevice_memoryBytes: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    configuredGpuDevice_irq: {
      type: DataTypes.STRING,
      allowNull: true
    },
    configuredGpuDevice_usesMachineInterface: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'configuredGpuDevice'
  });
};
