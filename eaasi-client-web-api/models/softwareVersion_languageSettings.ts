/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {softwareVersion_languageSettingsInstance, softwareVersion_languageSettingsAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<softwareVersion_languageSettingsInstance, softwareVersion_languageSettingsAttribute>('softwareVersion_languageSettings', {
    softwareVersion_softwareVersionID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'softwareVersion',
        key: 'softwareVersionID'
      }
    },
    softwareVersion_languageQID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    softwareVersion_defaultLanguage: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    tableName: 'softwareVersion_languageSettings'
  });
};
