/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {configuredOS_has_userInformationInstance, configuredOS_has_userInformationAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<configuredOS_has_userInformationInstance, configuredOS_has_userInformationAttribute>('configuredOS_has_userInformation', {
    configuredOS_configuredOperatingSystemID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'configuredOS',
        key: 'configuredOperatingSystemID'
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
    tableName: 'configuredOS_has_userInformation'
  });
};
