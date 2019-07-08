'use strict';

const Sequelize = require('sequelize');

class ConfiguredOsHasUserInformation extends Sequelize.Model {}

module.exports = (sequelize) => {
	ConfiguredOsHasUserInformation.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		configuredOS_configuredOperatingSystemID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'configuredOS',
				key: 'configuredOperatingSystemID'
			}
		},
		userInformation_userInformationID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'userInformation',
				key: 'userInformationID'
			}
		}
	}, {sequelize, tableName: 'configuredOs_has_userInformation'});
	ConfiguredOsHasUserInformation.associate = models => {

		models.ConfiguredOsHasUserInformation.hasOne(models.ConfiguredOS, {foreignKey: 'configuredOperatingSystemID'});
		models.ConfiguredOsHasUserInformation.hasOne(models.UserInformation, {foreignKey: 'userInformationID'});
	};
	return ConfiguredOsHasUserInformation;
}
