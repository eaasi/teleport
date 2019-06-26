/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {systemRequirements_includes_machineTypeInstance, systemRequirements_includes_machineTypeAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<systemRequirements_includes_machineTypeInstance, systemRequirements_includes_machineTypeAttribute>('systemRequirements_includes_machineType', {
    systemRequirements_systemRequirementsID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'systemRequirements',
        key: 'systemRequirementsID'
      }
    },
    systemRequirements_machineTypeID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'machineType',
        key: 'machineTypeID'
      }
    }
  }, {
    tableName: 'systemRequirements_includes_machineType'
  });
};
