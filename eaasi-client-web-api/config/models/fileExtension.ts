/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {fileExtensionInstance, fileExtensionAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<fileExtensionInstance, fileExtensionAttribute>('fileExtension', {
    fileExtensionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    extension: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'fileExtension'
  });
};
