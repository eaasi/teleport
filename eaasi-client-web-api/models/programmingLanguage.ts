/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {programmingLanguageInstance, programmingLanguageAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<programmingLanguageInstance, programmingLanguageAttribute>('programmingLanguage', {
    programmingLanguageQID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    programmingLanguageName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'programmingLanguage'
  });
};
