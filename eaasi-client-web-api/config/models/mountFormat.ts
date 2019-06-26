/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {mountFormatInstance, mountFormatAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<mountFormatInstance, mountFormatAttribute>('mountFormat', {
    mountFormatQID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    mountFormatName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'mountFormat'
  });
};
