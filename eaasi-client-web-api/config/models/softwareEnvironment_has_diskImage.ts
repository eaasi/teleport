/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {softwareEnvironment_has_diskImageInstance, softwareEnvironment_has_diskImageAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<softwareEnvironment_has_diskImageInstance, softwareEnvironment_has_diskImageAttribute>('softwareEnvironment_has_diskImage', {
    softwareEnvironment_softwareEnvironmentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'softwareEnvironment',
        key: 'softwareEnvironmentID'
      }
    },
    diskImageID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    mountPoint: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fileSystem: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'fileSystem',
        key: 'fileSystemQID'
      }
    },
    storageCapacityBytes: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    storageUsedBytes: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    storageRemainingBytes: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'softwareEnvironment_has_diskImage'
  });
};
