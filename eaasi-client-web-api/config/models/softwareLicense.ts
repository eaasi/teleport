/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {softwareLicenseInstance, softwareLicenseAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<softwareLicenseInstance, softwareLicenseAttribute>('softwareLicense', {
    softwareLicenseQID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    softwareLicenseName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'softwareLicense'
  });
};
