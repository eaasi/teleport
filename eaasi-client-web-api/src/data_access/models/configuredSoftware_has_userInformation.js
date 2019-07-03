'use strict';

import {UserInformation} from './userInformation';
import {ConfiguredSoftware} from './configuredSoftware';

const Sequelize = require('sequelize');

class ConfiguredSoftwareHasUserInformation extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
	};

	static associate(models) {
		ConfiguredSoftwareHasUserInformation.hasOne(UserInformation, {foreignKey: 'configuredSoftwareVersionID'});
		ConfiguredSoftwareHasUserInformation.hasOne(ConfiguredSoftware, {foreignKey: 'userInformationID'});
	}
};

module.exports = {
	ConfiguredSoftwareHasUserInformation: ConfiguredSoftwareHasUserInformation
};
