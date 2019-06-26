/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {osVersion_keyboardLayoutSettingsInstance, osVersion_keyboardLayoutSettingsAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<osVersion_keyboardLayoutSettingsInstance, osVersion_keyboardLayoutSettingsAttribute>('osVersion_keyboardLayoutSettings', {
    osVersion_osVersionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'osVersion',
        key: 'osVersionID'
      }
    },
    osVersion_keyboardLayoutQID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'keyboardLayout',
        key: 'keyboardLayoutQID'
      }
    },
    osVersion_keyboardLayoutName: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'osVersion_keyboardLayoutSettings'
  });
};
