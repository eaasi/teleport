/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {timezoneNameInstance, timezoneNameAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<timezoneNameInstance, timezoneNameAttribute>('timezoneName', {
    timezoneNameID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    timeZoneName: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'timezoneName'
  });
};
