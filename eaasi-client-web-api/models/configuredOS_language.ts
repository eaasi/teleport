/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {configuredOS_languageInstance, configuredOS_languageAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<configuredOS_languageInstance, configuredOS_languageAttribute>('configuredOS_language', {
    configuredOS_configuredOperatingSystemID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'configuredOS',
        key: 'configuredOperatingSystemID'
      }
    },
    configuredOs_languageQID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    configuredOS_primaryLanguage: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'configuredOS_language'
  });
};
