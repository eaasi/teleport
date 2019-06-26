/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {readWriteStatusInstance, readWriteStatusAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<readWriteStatusInstance, readWriteStatusAttribute>('readWriteStatus', {
    readWriteStatusID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    readWriteStatusName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'readWriteStatus'
  });
};
