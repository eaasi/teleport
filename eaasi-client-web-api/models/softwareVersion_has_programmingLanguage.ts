/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {softwareVersion_has_programmingLanguageInstance, softwareVersion_has_programmingLanguageAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<softwareVersion_has_programmingLanguageInstance, softwareVersion_has_programmingLanguageAttribute>('softwareVersion_has_programmingLanguage', {
    softwareVersion_softwareVersionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'softwareVersion',
        key: 'softwareVersionID'
      }
    },
    softwareVersion_programmingLanguageQID: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'programmingLanguage',
        key: 'programmingLanguageQID'
      }
    }
  }, {
    tableName: 'softwareVersion_has_programmingLanguage'
  });
};
