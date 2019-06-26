/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {storageDeviceTypeInstance, storageDeviceTypeAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<storageDeviceTypeInstance, storageDeviceTypeAttribute>('storageDeviceType', {
    storageDeviceTypeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    storageDeviceTypeQID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    storageDeviceTypeName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'storageDeviceType'
  });
};
