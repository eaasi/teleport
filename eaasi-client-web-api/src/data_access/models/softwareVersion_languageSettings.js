'use strict'

const Sequelize = require('sequelize');

class SoftwareVersionLanguageSettings extends Sequelize.Model {}
	module.exports = (sequelize) => {
	SoftwareVersionLanguageSettings.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		softwareVersion_softwareVersionID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'softwareVersion',
				key: 'softwareVersionID'
			}
		},
		softwareVersion_languageQID: {
			type: Sequelize.STRING,
			allowNull: true,
		},
	}, { sequelize, tableName: 'softwareVersion_languageSettings' });
	SoftwareVersionLanguageSettings.associate = models => {
		models.SoftwareVersionLanguageSettings.hasOne(
			models.SoftwareVersion, {foreignKey: 'softwareVersionID'});
	};
	return SoftwareVersionLanguageSettings;
};
