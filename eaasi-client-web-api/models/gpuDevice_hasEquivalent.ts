/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {gpuDevice_hasEquivalentInstance, gpuDevice_hasEquivalentAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<gpuDevice_hasEquivalentInstance, gpuDevice_hasEquivalentAttribute>('gpuDevice_hasEquivalent', {
    gpuDevice_gpuDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'gpuDevice',
        key: 'gpuDeviceID'
      }
    },
    gpuDevice_equivalentGpuDevice: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'gpuDevice_hasEquivalent'
  });
};
