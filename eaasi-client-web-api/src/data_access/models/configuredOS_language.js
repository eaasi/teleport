'use strict';

const Sequelize = require('sequelize');

class ConfiguredOsLanguage extends Sequelize.Model {}

module.exports = (sequelize) => {
	ConfiguredOsLanguage.init({
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
	ConfiguredOsLanguage.associate = models => {
		models.ConfiguredOsLanguage.hasOne(models.ConfiguredOS, {foreignKey: 'configuredOperatingSystemID'});
	};
};
