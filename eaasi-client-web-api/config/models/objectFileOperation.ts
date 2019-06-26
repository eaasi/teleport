/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {objectFileOperationInstance, objectFileOperationAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<objectFileOperationInstance, objectFileOperationAttribute>('objectFileOperation', {
    operationID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    operationName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'objectFileOperation'
  });
};
