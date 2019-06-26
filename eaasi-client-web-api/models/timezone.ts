/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {timezoneInstance, timezoneAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<timezoneInstance, timezoneAttribute>('timezone', {
    timezoneQID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    utcOffset: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'timezone'
  });
};
