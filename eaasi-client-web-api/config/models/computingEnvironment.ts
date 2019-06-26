/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {computingEnvironmentInstance, computingEnvironmentAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<computingEnvironmentInstance, computingEnvironmentAttribute>('computingEnvironment', {
    computingEnvironmentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    computingEnvironment_hasSourceOrg: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    computingEnvironment_inNetwork: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    computingEnvironment_configuredNetworkID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'configuredNetwork',
        key: 'configuredNetworkID'
      }
    },
    computingEnvironment_softwareEnvironmentID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'softwareEnvironment',
        key: 'softwareEnvironmentID'
      }
    }
  }, {
    tableName: 'computingEnvironment'
  });
};
