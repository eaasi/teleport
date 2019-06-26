/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {colorDepthInstance, colorDepthAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<colorDepthInstance, colorDepthAttribute>('colorDepth', {
    colorDepthID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    colorDepthName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bitDepth: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'colorDepth'
  });
};
