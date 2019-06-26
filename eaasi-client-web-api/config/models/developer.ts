/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {developerInstance, developerAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<developerInstance, developerAttribute>('developer', {
    developerQID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    developerName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'developer'
  });
};
