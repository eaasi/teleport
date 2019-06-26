/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {gpuDevice_has_displayInterfaceInstance, gpuDevice_has_displayInterfaceAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<gpuDevice_has_displayInterfaceInstance, gpuDevice_has_displayInterfaceAttribute>('gpuDevice_has_displayInterface', {
    gpuDevice_gpuDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'gpuDevice',
        key: 'gpuDeviceID'
      }
    },
    displayInterface_displayInterfaceID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'gpuDevice_has_displayInterface'
  });
};
