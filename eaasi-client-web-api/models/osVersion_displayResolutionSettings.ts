/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {osVersion_displayResolutionSettingsInstance, osVersion_displayResolutionSettingsAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<osVersion_displayResolutionSettingsInstance, osVersion_displayResolutionSettingsAttribute>('osVersion_displayResolutionSettings', {
    osVersion_osVersionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'osVersion',
        key: 'osVersionID'
      }
    },
    osVersion_displayResolutionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'displayResolution',
        key: 'displayResolutionID'
      }
    }
  }, {
    tableName: 'osVersion_displayResolutionSettings'
  });
};
