'use strict';

import {ConfiguredOS} from './configuredOS';
import {UserInformation} from './userInformation';

const Sequelize = require('sequelize');

class ConfiguredOsHasUserInformation extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
		}, { sequelize, tableName: 'configuredOs_has_userInformation' });
	};

	static associate(models) {
		ConfiguredOsHasUserInformation.hasOne(ConfiguredOS, {foreignKey: 'configuredOperatingSystemID'});
		ConfiguredOsHasUserInformation.hasOne(UserInformation, {foreignKey: 'userInformationID'});
	}
};

module.exports = {
	ConfiguredOsHasUserInformation: ConfiguredOsHasUserInformation
};
