/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {osVersion_has_programmingLanguageInstance, osVersion_has_programmingLanguageAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<osVersion_has_programmingLanguageInstance, osVersion_has_programmingLanguageAttribute>('osVersion_has_programmingLanguage', {
    osVersion_osVersionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'osVersion',
        key: 'osVersionID'
      }
    },
    osVersion_programmingLanguageQID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'programmingLanguage',
        key: 'programmingLanguageQID'
      }
    }
  }, {
    tableName: 'osVersion_has_programmingLanguage'
  });
};
