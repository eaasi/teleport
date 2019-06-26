/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {softwareEnvironment_hasPart_configuredSoftwareInstance, softwareEnvironment_hasPart_configuredSoftwareAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<softwareEnvironment_hasPart_configuredSoftwareInstance, softwareEnvironment_hasPart_configuredSoftwareAttribute>('softwareEnvironment_hasPart_configuredSoftware', {
    softwareEnvironment_softwareEnvironmentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'softwareEnvironment',
        key: 'softwareEnvironmentID'
      }
    },
    hasConfiguredSoftware: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'configuredSoftware',
        key: 'configuredSoftwareVersionID'
      }
    }
  }, {
    tableName: 'softwareEnvironment_hasPart_configuredSoftware'
  });
};
