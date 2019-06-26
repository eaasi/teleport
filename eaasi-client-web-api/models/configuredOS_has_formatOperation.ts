/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {configuredOS_has_formatOperationInstance, configuredOS_has_formatOperationAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<configuredOS_has_formatOperationInstance, configuredOS_has_formatOperationAttribute>('configuredOS_has_formatOperation', {
    configuredOS_configuredOperatingSystemID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'configuredOS',
        key: 'configuredOperatingSystemID'
      }
    },
    formatOperation_opensFileFormat: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'fileFormat',
        key: 'fileFormatQID'
      }
    },
    formatOperation_usesConfiguredSoftware: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'configuredSoftware',
        key: 'configuredSoftwareVersionID'
      }
    }
  }, {
    tableName: 'configuredOS_has_formatOperation'
  });
};
