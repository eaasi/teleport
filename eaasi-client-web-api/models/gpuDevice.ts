/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {gpuDeviceInstance, gpuDeviceAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<gpuDeviceInstance, gpuDeviceAttribute>('gpuDevice', {
    gpuDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    gpuDeviceQID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gpuDeviceName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'gpuDevice'
  });
};
