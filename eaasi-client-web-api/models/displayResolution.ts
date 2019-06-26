/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {displayResolutionInstance, displayResolutionAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<displayResolutionInstance, displayResolutionAttribute>('displayResolution', {
    displayResolutionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    displayResolutionName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'displayResolution'
  });
};
