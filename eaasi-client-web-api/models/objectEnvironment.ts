/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {objectEnvironmentInstance, objectEnvironmentAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<objectEnvironmentInstance, objectEnvironmentAttribute>('objectEnvironment', {
    objectEnvironment_objectEnvironment_computingEnvironmentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'computingEnvironment',
        key: 'computingEnvironmentID'
      }
    },
    objectEnvironment_objectEnvironment_digitalObjectID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'digitalObject',
        key: 'digitalObjectID'
      }
    },
    objectEnvironment_concurrentInstances: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    objectEnvironmentName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    objectEnvironmentDescription: {
      type: DataTypes.STRING,
      allowNull: true
    },
    objectEnvironmentHelpText: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'objectEnvironment'
  });
};
