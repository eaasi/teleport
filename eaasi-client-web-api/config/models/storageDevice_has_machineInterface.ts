/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {storageDevice_has_machineInterfaceInstance, storageDevice_has_machineInterfaceAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<storageDevice_has_machineInterfaceInstance, storageDevice_has_machineInterfaceAttribute>('storageDevice_has_machineInterface', {
    storageDevice_storageDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'storageDevice',
        key: 'storageDeviceID'
      }
    },
    storageDevice_machineInterfaceID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'storageDevice_has_machineInterface'
  });
};
