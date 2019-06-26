/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {configuredSoftware_uses_formatImplementationInstance, configuredSoftware_uses_formatImplementationAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<configuredSoftware_uses_formatImplementationInstance, configuredSoftware_uses_formatImplementationAttribute>('configuredSoftware_uses_formatImplementation', {
    configuredSoftware_configuredSoftwareManifestationID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'configuredSoftware',
        key: 'configuredSoftwareVersionID'
      }
    },
    configuredSoftware_formatImplementation: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'formatImplementation',
        key: 'formatImplementationID'
      }
    },
    configuredFormatOperation: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'formatOperation',
        key: 'operationID'
      }
    }
  }, {
    tableName: 'configuredSoftware_uses_formatImplementation'
  });
};
