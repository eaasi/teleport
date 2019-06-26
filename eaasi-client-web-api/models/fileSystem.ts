/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {fileSystemInstance, fileSystemAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<fileSystemInstance, fileSystemAttribute>('fileSystem', {
    fileSystemQID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    fileSystemName: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'fileSystem'
  });
};
