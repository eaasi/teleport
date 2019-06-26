/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {alternateNameInstance, alternateNameAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<alternateNameInstance, alternateNameAttribute>('alternateName', {
    alternateNameID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    alternateName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'alternateName'
  });
};
