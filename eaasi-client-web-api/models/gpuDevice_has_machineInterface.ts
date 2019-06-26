/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {gpuDevice_has_machineInterfaceInstance, gpuDevice_has_machineInterfaceAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<gpuDevice_has_machineInterfaceInstance, gpuDevice_has_machineInterfaceAttribute>('gpuDevice_has_machineInterface', {
    gpuDevice_gpuDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'gpuDevice',
        key: 'gpuDeviceID'
      }
    },
    gpuDevice_machineInterfaceID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'gpuDevice_has_machineInterface'
  });
};
