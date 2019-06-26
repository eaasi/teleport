/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {systemRequirements_includes_pointerDeviceTypeInstance, systemRequirements_includes_pointerDeviceTypeAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<systemRequirements_includes_pointerDeviceTypeInstance, systemRequirements_includes_pointerDeviceTypeAttribute>('systemRequirements_includes_pointerDeviceType', {
    systemRequirements_systemRequirementsID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'systemRequirements',
        key: 'systemRequirementsID'
      }
    },
    systemRequirements_pointerDeviceTypeID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'pointerDevice',
        key: 'pointerDeviceID'
      }
    }
  }, {
    tableName: 'systemRequirements_includes_pointerDeviceType'
  });
};
