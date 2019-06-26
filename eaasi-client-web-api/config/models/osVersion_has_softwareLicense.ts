/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {osVersion_has_softwareLicenseInstance, osVersion_has_softwareLicenseAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<osVersion_has_softwareLicenseInstance, osVersion_has_softwareLicenseAttribute>('osVersion_has_softwareLicense', {
    osVersion_osVersionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'osVersion',
        key: 'osVersionID'
      }
    },
    osVersion_softwareLicenseQID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'softwareLicense',
        key: 'softwareLicenseQID'
      }
    }
  }, {
    tableName: 'osVersion_has_softwareLicense'
  });
};
