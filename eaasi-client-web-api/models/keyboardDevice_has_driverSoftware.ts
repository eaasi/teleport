/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {keyboardDevice_has_driverSoftwareInstance, keyboardDevice_has_driverSoftwareAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<keyboardDevice_has_driverSoftwareInstance, keyboardDevice_has_driverSoftwareAttribute>('keyboardDevice_has_driverSoftware', {
    keyboardDevice_keyboardDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'keyboardDevice',
        key: 'keyboardDeviceID'
      }
    },
    keyboardDevice_driverSoftware: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'softwareVersion',
        key: 'softwareVersionID'
      }
    }
  }, {
    tableName: 'keyboardDevice_has_driverSoftware'
  });
};
