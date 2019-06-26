/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {softwareFamilyVersion_hasPart_softwareVersionInstance, softwareFamilyVersion_hasPart_softwareVersionAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<softwareFamilyVersion_hasPart_softwareVersionInstance, softwareFamilyVersion_hasPart_softwareVersionAttribute>('softwareFamilyVersion_hasPart_softwareVersion', {
    softwareFamilyVersionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'softwareVersion',
        key: 'softwareVersionID'
      }
    },
    hasPart_softwareVersion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'softwareVersion',
        key: 'softwareVersionID'
      }
    }
  }, {
    tableName: 'softwareFamilyVersion_hasPart_softwareVersion'
  });
};
