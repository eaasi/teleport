/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {systemRequirements_includes_gpuDeviceInstance, systemRequirements_includes_gpuDeviceAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<systemRequirements_includes_gpuDeviceInstance, systemRequirements_includes_gpuDeviceAttribute>('systemRequirements_includes_gpuDevice', {
    systemRequirements_systemRequirementsID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    systemRequirements_gpuDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'gpuDevice',
        key: 'gpuDeviceID'
      }
    },
    systemRequirements_minimumGpuRAM: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'systemRequirements_includes_gpuDevice'
  });
};
