/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {storageDeviceInstance, storageDeviceAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<storageDeviceInstance, storageDeviceAttribute>('storageDevice', {
    storageDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    storageDeviceQID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    storageDeviceName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    storageDeviceType: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'storageDeviceType',
        key: 'storageDeviceTypeID'
      }
    },
    storageVolumeBytes: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    storageDevice_readWriteStatusID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'readWriteStatus',
        key: 'readWriteStatusID'
      }
    }
  }, {
    tableName: 'storageDevice'
  });
};
