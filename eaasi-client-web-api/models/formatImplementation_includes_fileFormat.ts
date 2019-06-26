/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {formatImplementation_includes_fileFormatInstance, formatImplementation_includes_fileFormatAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<formatImplementation_includes_fileFormatInstance, formatImplementation_includes_fileFormatAttribute>('formatImplementation_includes_fileFormat', {
    formatImplementation_formatImplementationID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'formatImplementation',
        key: 'formatImplementationID'
      }
    },
    fileFormat_fileFormatQID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'fileFormat',
        key: 'fileFormatQID'
      }
    }
  }, {
    tableName: 'formatImplementation_includes_fileFormat'
  });
};
