/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {softwareVersion_has_softwareLicenseInstance, softwareVersion_has_softwareLicenseAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<softwareVersion_has_softwareLicenseInstance, softwareVersion_has_softwareLicenseAttribute>('softwareVersion_has_softwareLicense', {
    softwareVersion_softwareVersionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'softwareVersion',
        key: 'softwareVersionID'
      }
    },
    softwareVersion_softwareLicenseQID: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'softwareLicense',
        key: 'softwareLicenseQID'
      }
    }
  }, {
    tableName: 'softwareVersion_has_softwareLicense'
  });
};
