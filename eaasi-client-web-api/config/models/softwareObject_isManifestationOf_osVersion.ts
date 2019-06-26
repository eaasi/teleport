/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {softwareObject_isManifestationOf_osVersionInstance, softwareObject_isManifestationOf_osVersionAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<softwareObject_isManifestationOf_osVersionInstance, softwareObject_isManifestationOf_osVersionAttribute>('softwareObject_isManifestationOf_osVersion', {
    softwareObject_softwareObjectID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'softwareObject',
        key: 'softwareObjectID'
      }
    },
    softwareObject_osVersionID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'osVersion',
        key: 'osVersionID'
      }
    }
  }, {
    tableName: 'softwareObject_isManifestationOf_osVersion'
  });
};
