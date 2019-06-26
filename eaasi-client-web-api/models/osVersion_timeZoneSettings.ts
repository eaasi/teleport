/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {osVersion_timeZoneSettingsInstance, osVersion_timeZoneSettingsAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<osVersion_timeZoneSettingsInstance, osVersion_timeZoneSettingsAttribute>('osVersion_timeZoneSettings', {
    osVersion_osVersionID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'osVersion',
        key: 'osVersionID'
      }
    },
    osVersion_timezoneQID: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'timezone',
        key: 'timezoneQID'
      }
    },
    osVersion_timezoneName: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'osVersion_timeZoneSettings'
  });
};
