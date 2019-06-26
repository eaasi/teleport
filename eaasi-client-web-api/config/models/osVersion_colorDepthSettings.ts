/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {osVersion_colorDepthSettingsInstance, osVersion_colorDepthSettingsAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<osVersion_colorDepthSettingsInstance, osVersion_colorDepthSettingsAttribute>('osVersion_colorDepthSettings', {
    osVersion_osVersionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'osVersion',
        key: 'osVersionID'
      }
    },
    osVersion_colorDepthID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'colorDepth',
        key: 'colorDepthID'
      }
    }
  }, {
    tableName: 'osVersion_colorDepthSettings'
  });
};
