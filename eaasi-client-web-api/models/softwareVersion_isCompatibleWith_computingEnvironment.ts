/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {softwareVersion_isCompatibleWith_computingEnvironmentInstance, softwareVersion_isCompatibleWith_computingEnvironmentAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<softwareVersion_isCompatibleWith_computingEnvironmentInstance, softwareVersion_isCompatibleWith_computingEnvironmentAttribute>('softwareVersion_isCompatibleWith_computingEnvironment', {
    sofwareVersion_softwareVersionID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'softwareVersion',
        key: 'softwareVersionID'
      }
    },
    compatibleComputingEnvironmentID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'computingEnvironment',
        key: 'computingEnvironmentID'
      }
    }
  }, {
    tableName: 'softwareVersion_isCompatibleWith_computingEnvironment'
  });
};
