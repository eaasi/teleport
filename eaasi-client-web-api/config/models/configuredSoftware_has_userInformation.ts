/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {configuredSoftware_has_userInformationInstance, configuredSoftware_has_userInformationAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<configuredSoftware_has_userInformationInstance, configuredSoftware_has_userInformationAttribute>('configuredSoftware_has_userInformation', {
    configuredSoftware_configuredSoftwareManifestationID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'configuredSoftware',
        key: 'configuredSoftwareVersionID'
      }
    },
    userInformation_userInformationID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'userInformation',
        key: 'userInformationID'
      }
    }
  }, {
    tableName: 'configuredSoftware_has_userInformation'
  });
};
