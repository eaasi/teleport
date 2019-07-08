'use strict';

const Sequelize = require('sequelize');

class OsVersionKeyboardLanguageSettings extends Sequelize.Model {}
module.exports = (sequelize) => {
	OsVersionKeyboardLanguageSettings.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		osVersion_osVersionID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'osVersion',
				key: 'osVersionID'
			}
		},
		osVersion_keyboardLanguageQID: {
			type: Sequelize.STRING,
			allowNull: false
		}
	}, {sequelize, tableName: 'osVersion_displayResolutionSettings'});
	OsVersionKeyboardLanguageSettings.associate = models => {
		models.OsVersionKeyboardLanguageSettings.hasOne(models.OsVersion, {foreignKey: 'osVersionID'});
	};
	return OsVersionKeyboardLanguageSettings;
};

