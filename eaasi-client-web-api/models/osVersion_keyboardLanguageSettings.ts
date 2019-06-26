/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {osVersion_keyboardLanguageSettingsInstance, osVersion_keyboardLanguageSettingsAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<osVersion_keyboardLanguageSettingsInstance, osVersion_keyboardLanguageSettingsAttribute>('osVersion_keyboardLanguageSettings', {
    osVersion_osVersionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'osVersion',
        key: 'osVersionID'
      }
    },
    osVersion_keyboardLanguageQID: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'osVersion_keyboardLanguageSettings'
  });
};
