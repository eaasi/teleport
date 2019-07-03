'use strict';

import {ConfiguredOS} from './configuredOS';

const Sequelize = require('sequelize');

class ConfiguredOsLanguage extends Sequelize.Model {
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
			configuredOs_languageQID: {
				type: Sequelize.STRING,
				allowNull: true
			},
			configuredOS_primaryLanguage: {
				type: Sequelize.BOOLEAN,
				allowNull: true
			}
		}, { sequelize, tableName: 'configuredOsLanguage' });
	};

	static associate(models) {
		ConfiguredOsLanguage.hasOne(ConfiguredOS, {foreignKey: 'configuredOperatingSystemID'});
	}
};

module.exports = {
	ConfiguredOsLanguage: ConfiguredOsLanguage
};
