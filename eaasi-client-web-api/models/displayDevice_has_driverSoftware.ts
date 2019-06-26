/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {displayDevice_has_driverSoftwareInstance, displayDevice_has_driverSoftwareAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<displayDevice_has_driverSoftwareInstance, displayDevice_has_driverSoftwareAttribute>('displayDevice_has_driverSoftware', {
    displayDevice_displayDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'displayDevice',
        key: 'displayDeviceID'
      }
    },
    displayDevice_driverSoftwareID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'softwareVersion',
        key: 'softwareVersionID'
      }
    }
  }, {
    tableName: 'displayDevice_has_driverSoftware'
  });
};
