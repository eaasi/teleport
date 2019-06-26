/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {systemRequirementsInstance, systemRequirementsAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<systemRequirementsInstance, systemRequirementsAttribute>('systemRequirements', {
    systemRequirementsID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    requirementsSummary: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    minimumRAM: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    minimumDiskSpace: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    minimumColorDepth: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'colorDepth',
        key: 'colorDepthID'
      }
    },
    minimumDisplayResolution: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'displayResolution',
        key: 'displayResolutionID'
      }
    },
    internetAccessRequired: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    minimumMbps: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'systemRequirements'
  });
};
