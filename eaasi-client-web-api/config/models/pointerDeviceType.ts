/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {pointerDeviceTypeInstance, pointerDeviceTypeAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<pointerDeviceTypeInstance, pointerDeviceTypeAttribute>('pointerDeviceType', {
    pointerDeviceTypeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    pointerDeviceTypeName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pointerDeviceTypeQID: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'pointerDeviceType'
  });
};
