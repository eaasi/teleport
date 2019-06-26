/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {audioDevice_has_driverSoftwareInstance, audioDevice_has_driverSoftwareAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<audioDevice_has_driverSoftwareInstance, audioDevice_has_driverSoftwareAttribute>('audioDevice_has_driverSoftware', {
    audioDevice_audioDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'audioDevice',
        key: 'audioDeviceID'
      }
    },
    audioDevice_driverSoftwareID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'softwareVersion',
        key: 'softwareVersionID'
      }
    }
  }, {
    tableName: 'audioDevice_has_driverSoftware'
  });
};
