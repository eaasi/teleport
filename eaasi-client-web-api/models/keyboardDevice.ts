/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {keyboardDeviceInstance, keyboardDeviceAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<keyboardDeviceInstance, keyboardDeviceAttribute>('keyboardDevice', {
    keyboardDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    keyboardDeviceQID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    keyboardDeviceName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    keyboardDevice_keyboardLayout: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'keyboardLayout',
        key: 'keyboardLayoutQID'
      }
    }
  }, {
    tableName: 'keyboardDevice'
  });
};
