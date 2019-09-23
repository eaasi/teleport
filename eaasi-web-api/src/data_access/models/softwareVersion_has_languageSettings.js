'use strict';

const Sequelize = require('sequelize');

class SoftwareVersionHasLanguageSettings extends Sequelize.Model {}
module.exports = (sequelize) => {
	SoftwareVersionHasLanguageSettings.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		softwareVersion_softwareVersionID: {
			type: Sequelize.STRING,
			allowNull: false,
			references: {
				model: 'softwareVersion',
				key: 'softwareVersionID'
			}
		},
		softwareVersion_languageQID: {
			type: Sequelize.STRING,
			allowNull: true,
			references: {
				model: 'language',
				key: 'languageQID'
			}
		},
		softwareVersion_defaultLanguage: {
			type: Sequelize.BOOLEAN,
			allowNull: true,
		}
	}, { sequelize, tableName: 'pointerDevice' });
	return SoftwareVersionHasLanguageSettings;
};
