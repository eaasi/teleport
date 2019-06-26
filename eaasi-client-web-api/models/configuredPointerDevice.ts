/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {configuredPointerDeviceInstance, configuredPointerDeviceAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<configuredPointerDeviceInstance, configuredPointerDeviceAttribute>('configuredPointerDevice', {
    configuredMachine_machineID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'configuredMachine',
        key: 'configuredMachineID'
      }
    },
    configuredPointerDevice_pointerDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pointerDevice',
        key: 'pointerDeviceID'
      }
    },
    configuredPointerDevice_usesMachineInterface: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'configuredPointerDevice'
  });
};
