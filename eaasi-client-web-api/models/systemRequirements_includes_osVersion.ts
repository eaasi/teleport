/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {systemRequirements_includes_osVersionInstance, systemRequirements_includes_osVersionAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<systemRequirements_includes_osVersionInstance, systemRequirements_includes_osVersionAttribute>('systemRequirements_includes_osVersion', {
    systemRequirements_systemRequirementsID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'systemRequirements',
        key: 'systemRequirementsID'
      }
    },
    systemRequirements_osVersionID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'osVersion',
        key: 'osVersionID'
      }
    }
  }, {
    tableName: 'systemRequirements_includes_osVersion'
  });
};
