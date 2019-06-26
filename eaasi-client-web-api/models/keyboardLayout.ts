/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {keyboardLayoutInstance, keyboardLayoutAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<keyboardLayoutInstance, keyboardLayoutAttribute>('keyboardLayout', {
    keyboardLayoutQID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    keyboardLayoutName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'keyboardLayout'
  });
};
