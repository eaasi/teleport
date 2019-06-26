/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {audioDevice_has_machineInterfaceInstance, audioDevice_has_machineInterfaceAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<audioDevice_has_machineInterfaceInstance, audioDevice_has_machineInterfaceAttribute>('audioDevice_has_machineInterface', {
    audioDevice_audioDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'audioDevice',
        key: 'audioDeviceID'
      }
    },
    audioDevice_machineInterfaceID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'audioDevice_has_machineInterface'
  });
};
