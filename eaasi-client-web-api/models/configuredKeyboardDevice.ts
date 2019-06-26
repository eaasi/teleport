/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {configuredKeyboardDeviceInstance, configuredKeyboardDeviceAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<configuredKeyboardDeviceInstance, configuredKeyboardDeviceAttribute>('configuredKeyboardDevice', {
    configuredMachine_machineID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'configuredMachine',
        key: 'configuredMachineID'
      }
    },
    configuredKeyboardDevice_keyboardDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'keyboardDevice',
        key: 'keyboardDeviceID'
      }
    },
    configuredKeyboardDevice_usesMachineInterface: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'configuredKeyboardDevice'
  });
};
