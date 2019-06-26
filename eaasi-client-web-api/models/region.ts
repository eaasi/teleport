/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {regionInstance, regionAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<regionInstance, regionAttribute>('region', {
    regionQID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    regionName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    iso31661_numericCode: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'region'
  });
};
