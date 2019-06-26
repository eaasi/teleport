/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {timezone_has_timezoneNameInstance, timezone_has_timezoneNameAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<timezone_has_timezoneNameInstance, timezone_has_timezoneNameAttribute>('timezone_has_timezoneName', {
    timezone_timezoneQID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'timezone',
        key: 'timezoneQID'
      }
    },
    timezoneName_timezoneNameID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'timezoneName',
        key: 'timezoneNameID'
      }
    }
  }, {
    tableName: 'timezone_has_timezoneName'
  });
};
