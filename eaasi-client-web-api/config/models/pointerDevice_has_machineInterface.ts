/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {pointerDevice_has_machineInterfaceInstance, pointerDevice_has_machineInterfaceAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<pointerDevice_has_machineInterfaceInstance, pointerDevice_has_machineInterfaceAttribute>('pointerDevice_has_machineInterface', {
    pointerDevice_pointerDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pointerDevice',
        key: 'pointerDeviceID'
      }
    },
    pointerDevice_machineInterfaceID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'pointerDevice_has_machineInterface'
  });
};
