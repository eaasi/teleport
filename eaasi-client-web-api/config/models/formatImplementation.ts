/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {formatImplementationInstance, formatImplementationAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<formatImplementationInstance, formatImplementationAttribute>('formatImplementation', {
    formatImplementationID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    formatImplementationName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    implementationExtension: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'fileExtension',
        key: 'fileExtensionID'
      }
    }
  }, {
    tableName: 'formatImplementation'
  });
};
