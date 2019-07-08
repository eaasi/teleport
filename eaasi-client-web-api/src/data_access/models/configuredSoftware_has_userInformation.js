'use strict';

const Sequelize = require('sequelize');

class ConfiguredSoftwareHasUserInformation extends Sequelize.Model {}
	module.exports = (sequelize) => {
	ConfiguredSoftwareHasUserInformation.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		configuredSoftware_configuredSoftwareManifestationID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'configuredSoftware',
				key: 'configuredSoftwareVersionID'
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
	}, { sequelize, tableName: 'configuredSoftware_has_userInformation' });
	ConfiguredSoftwareHasUserInformation.associate = models => {
		models.ConfiguredSoftwareHasUserInformation.hasOne(models.UserInformation, {foreignKey: 'configuredSoftwareVersionID'});
		models.ConfiguredSoftwareHasUserInformation.hasOne(models.ConfiguredSoftware, {foreignKey: 'userInformationID'});
	};

	return ConfiguredSoftwareHasUserInformation;
};
