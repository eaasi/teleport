/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {digitalObject_isCompatibleWith_computingEnvironmentInstance, digitalObject_isCompatibleWith_computingEnvironmentAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<digitalObject_isCompatibleWith_computingEnvironmentInstance, digitalObject_isCompatibleWith_computingEnvironmentAttribute>('digitalObject_isCompatibleWith_computingEnvironment', {
    digitalObject_digitalObjectID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'digitalObject',
        key: 'digitalObjectID'
      }
    },
    compatibleComputingEnvironmentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'computingEnvironment',
        key: 'computingEnvironmentID'
      }
    }
  }, {
    tableName: 'digitalObject_isCompatibleWith_computingEnvironment'
  });
};
