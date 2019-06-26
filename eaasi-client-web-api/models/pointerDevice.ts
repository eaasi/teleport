/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {pointerDeviceInstance, pointerDeviceAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<pointerDeviceInstance, pointerDeviceAttribute>('pointerDevice', {
    pointerDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pointerDeviceQID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pointerDeviceName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pointerDeviceType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pointerDeviceType',
        key: 'pointerDeviceTypeID'
      }
    }
  }, {
    tableName: 'pointerDevice'
  });
};
