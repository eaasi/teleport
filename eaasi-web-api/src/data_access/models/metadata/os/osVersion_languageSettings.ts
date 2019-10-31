'use strict';

const Sequelize = require('sequelize');

class OsVersionLanguageSettings extends Sequelize.Model {}
module.exports = (sequelize) => {
	OsVersionLanguageSettings.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		osVersion_osVersionID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'osVersion',
				key: 'osVersionID'
			}
		},
		osVersion_languageQID: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		osVersion_DefaultLanguage: {
			type: Sequelize.BOOLEAN,
			allowNull: true
		}
	}, { sequelize, tableName: 'osVersion_languageSettings' });
	OsVersionLanguageSettings.associate = models => {
		models.OsVersionLanguageSettings.hasOne(models.OsVersion, {foreignKey: 'osVersionID'});
	};
	return OsVersionLanguageSettings;
};
