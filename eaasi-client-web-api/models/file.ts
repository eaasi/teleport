/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {fileInstance, fileAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<fileInstance, fileAttribute>('file', {
    fileID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fileLocation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fileChecksum: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fileFormat: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'fileFormat',
        key: 'fileFormatQID'
      }
    },
    fileSize: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'file'
  });
};
