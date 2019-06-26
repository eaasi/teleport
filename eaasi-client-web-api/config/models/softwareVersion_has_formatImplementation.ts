/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {softwareVersion_has_formatImplementationInstance, softwareVersion_has_formatImplementationAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<softwareVersion_has_formatImplementationInstance, softwareVersion_has_formatImplementationAttribute>('softwareVersion_has_formatImplementation', {
    softwareVersion_softwareVersionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'softwareVersion',
        key: 'softwareVersionID'
      }
    },
    softwareVersion_formatImplementationID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'formatImplementation',
        key: 'formatImplementationID'
      }
    },
    softwareVersion_implementationOperation: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'formatOperation',
        key: 'operationID'
      }
    },
    defaultImplementation: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'softwareVersion_has_formatImplementation'
  });
};
