/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {osVersion_regionSettingsInstance, osVersion_regionSettingsAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<osVersion_regionSettingsInstance, osVersion_regionSettingsAttribute>('osVersion_regionSettings', {
    osVersion_osVersionID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'osVersion',
        key: 'osVersionID'
      }
    },
    osVersion_regionQID: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'region',
        key: 'regionQID'
      }
    },
    osVersion_defaultRegion: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'osVersion_regionSettings'
  });
};
