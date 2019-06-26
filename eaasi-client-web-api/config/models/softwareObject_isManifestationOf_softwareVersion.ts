/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {softwareObject_isManifestationOf_softwareVersionInstance, softwareObject_isManifestationOf_softwareVersionAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<softwareObject_isManifestationOf_softwareVersionInstance, softwareObject_isManifestationOf_softwareVersionAttribute>('softwareObject_isManifestationOf_softwareVersion', {
    softwareObject_softwareObjectID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'softwareObject',
        key: 'softwareObjectID'
      }
    },
    softwareObject_softwareVersionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'softwareVersion',
        key: 'softwareVersionID'
      }
    }
  }, {
    tableName: 'softwareObject_isManifestationOf_softwareVersion'
  });
};
