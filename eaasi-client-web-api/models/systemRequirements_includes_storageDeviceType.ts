/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {systemRequirements_includes_storageDeviceTypeInstance, systemRequirements_includes_storageDeviceTypeAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<systemRequirements_includes_storageDeviceTypeInstance, systemRequirements_includes_storageDeviceTypeAttribute>('systemRequirements_includes_storageDeviceType', {
    systemRequirements_systemRequirementsID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'systemRequirements',
        key: 'systemRequirementsID'
      }
    },
    systemRequirements_storageDeviceTypeID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'storageDeviceType',
        key: 'storageDeviceTypeID'
      }
    }
  }, {
    tableName: 'systemRequirements_includes_storageDeviceType'
  });
};
