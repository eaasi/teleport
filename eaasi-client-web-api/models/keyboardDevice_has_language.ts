/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {keyboardDevice_has_languageInstance, keyboardDevice_has_languageAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<keyboardDevice_has_languageInstance, keyboardDevice_has_languageAttribute>('keyboardDevice_has_language', {
    keyboardDevice_keyboardDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'keyboardDevice',
        key: 'keyboardDeviceID'
      }
    },
    keyboardDevice_languageQID: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'keyboardDevice_has_language'
  });
};
