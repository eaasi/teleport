/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {softwareVersion_has_developerInstance, softwareVersion_has_developerAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<softwareVersion_has_developerInstance, softwareVersion_has_developerAttribute>('softwareVersion_has_developer', {
    softwareVersion_softwareVersionID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'softwareVersion',
        key: 'softwareVersionID'
      }
    },
    softwareVersion_softwareDeveloperQID: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'developer',
        key: 'developerQID'
      }
    }
  }, {
    tableName: 'softwareVersion_has_developer'
  });
};
