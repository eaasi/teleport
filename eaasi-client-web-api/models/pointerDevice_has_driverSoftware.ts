/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {pointerDevice_has_driverSoftwareInstance, pointerDevice_has_driverSoftwareAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<pointerDevice_has_driverSoftwareInstance, pointerDevice_has_driverSoftwareAttribute>('pointerDevice_has_driverSoftware', {
    pointerDevice_pointerDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pointerDevice',
        key: 'pointerDeviceID'
      }
    },
    pointerDevice_driverSoftwareID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'softwareVersion',
        key: 'softwareVersionID'
      }
    }
  }, {
    tableName: 'pointerDevice_has_driverSoftware'
  });
};
