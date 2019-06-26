/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {softwareTypeInstance, softwareTypeAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<softwareTypeInstance, softwareTypeAttribute>('softwareType', {
    softwareTypeQID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    softwaretypename: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'softwareType'
  });
};
