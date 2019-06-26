/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {machineTypeInstance, machineTypeAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<machineTypeInstance, machineTypeAttribute>('machineType', {
    machineTypeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    machineTypeName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'machineType'
  });
};
