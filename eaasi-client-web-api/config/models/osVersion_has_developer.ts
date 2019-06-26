/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {osVersion_has_developerInstance, osVersion_has_developerAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<osVersion_has_developerInstance, osVersion_has_developerAttribute>('osVersion_has_developer', {
    osVersion_osVersionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'osVersion',
        key: 'osVersionID'
      }
    },
    osVersion_developerQID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'developer',
        key: 'developerQID'
      }
    }
  }, {
    tableName: 'osVersion_has_developer'
  });
};
