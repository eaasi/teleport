/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {networkDevice_has_driverSoftwareInstance, networkDevice_has_driverSoftwareAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<networkDevice_has_driverSoftwareInstance, networkDevice_has_driverSoftwareAttribute>('networkDevice_has_driverSoftware', {
    networkDevice_networkDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'networkDevice',
        key: 'networkDeviceID'
      }
    },
    driverSoftware_driverSoftware: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'softwareVersion',
        key: 'softwareVersionID'
      }
    }
  }, {
    tableName: 'networkDevice_has_driverSoftware'
  });
};
