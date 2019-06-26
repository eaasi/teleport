/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {networkDeviceInstance, networkDeviceAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<networkDeviceInstance, networkDeviceAttribute>('networkDevice', {
    networkDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    networkDeviceQID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    networkDeviceName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'networkDevice'
  });
};
