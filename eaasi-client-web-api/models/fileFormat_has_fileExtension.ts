/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {fileFormat_has_fileExtensionInstance, fileFormat_has_fileExtensionAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<fileFormat_has_fileExtensionInstance, fileFormat_has_fileExtensionAttribute>('fileFormat_has_fileExtension', {
    fileFormat_fileFormatQID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'fileFormat',
        key: 'fileFormatQID'
      }
    },
    fileExtension_fileExtensionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'fileExtension',
        key: 'fileExtensionID'
      }
    }
  }, {
    tableName: 'fileFormat_has_fileExtension'
  });
};
