/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {fileFormatInstance, fileFormatAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<fileFormatInstance, fileFormatAttribute>('fileFormat', {
    fileFormatQID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    fileFormatName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pronomID: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'fileFormat'
  });
};
