/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {softwareProductInstance, softwareProductAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<softwareProductInstance, softwareProductAttribute>('softwareProduct', {
    softwareProductID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    softwareProductQID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    softwareProductDescription: {
      type: DataTypes.STRING,
      allowNull: true
    },
    softwareProductName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'softwareProduct'
  });
};
