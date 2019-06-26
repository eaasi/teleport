/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {cpuArchitectureInstance, cpuArchitectureAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<cpuArchitectureInstance, cpuArchitectureAttribute>('cpuArchitecture', {
    cpuArchitectureQID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    cpuArchitectureName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'cpuArchitecture'
  });
};
