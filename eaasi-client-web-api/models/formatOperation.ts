/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {formatOperationInstance, formatOperationAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<formatOperationInstance, formatOperationAttribute>('formatOperation', {
    operationID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    operationName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'formatOperation'
  });
};
