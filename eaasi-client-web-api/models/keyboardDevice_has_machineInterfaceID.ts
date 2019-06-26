/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {keyboardDevice_has_machineInterfaceIDInstance, keyboardDevice_has_machineInterfaceIDAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<keyboardDevice_has_machineInterfaceIDInstance, keyboardDevice_has_machineInterfaceIDAttribute>('keyboardDevice_has_machineInterfaceID', {
    keyboardDevice_keyboardDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'keyboardDevice',
        key: 'keyboardDeviceID'
      }
    },
    keyboardDevice_machineInterfaceID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'keyboardDevice_has_machineInterfaceID'
  });
};
