/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {osVersion_languageSettingsInstance, osVersion_languageSettingsAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<osVersion_languageSettingsInstance, osVersion_languageSettingsAttribute>('osVersion_languageSettings', {
    osVersion_osVersionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 'nextval(os_version_language_settings_id_seq::regclass)',
      primaryKey: true,
      references: {
        model: 'osVersion',
        key: 'osVersionID'
      }
    },
    osVersion_languageQID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    osVersion_DefaultLanguage: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'osVersion_languageSettings'
  });
};
