/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {softwareEnvironmentInstance, softwareEnvironmentAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<softwareEnvironmentInstance, softwareEnvironmentAttribute>('softwareEnvironment', {
    softwareEnvironmentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    softwareEnvironmentName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    softwareEnvironmentDescription: {
      type: DataTypes.STRING,
      allowNull: true
    },
    softwareEnvironmentHelpText: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    derivedFrom_softwareEnvironment: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'softwareEnvironment',
        key: 'softwareEnvironmentID'
      }
    },
    softwareEnvironment_hasPart_configuredOS: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'configuredOS',
        key: 'configuredOperatingSystemID'
      }
    }
  }, {
    tableName: 'softwareEnvironment'
  });
};
