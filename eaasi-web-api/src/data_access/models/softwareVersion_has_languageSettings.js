'use strict';

const Sequelize = require('sequelize');

class SoftwareVersionHasLanguageSettings extends Sequelize.Model {}
module.exports = (sequelize) => {
	SoftwareVersionHasLanguageSettings.init({
		createdAt: Sq.DATE,
		updatedAt: Sq.DATE,
		softwareVersion_softwareVersionID: {
			type: Sq.INTEGER,
			allowNull: false,
			references: {
				model: 'softwareVersion',
				key: 'softwareVersionID'
			}
		},
		softwareVersion_languageQID: {
			type: Sq.STRING,
			allowNull: true,
			references: {
				model: 'language',
				key: 'languageQID'
			}
		},
		softwareVersion_defaultLanguage: {
			type: Sq.BOOLEAN,
			allowNull: true,
		}
	}, { sequelize, tableName: 'pointerDevice' });
	return SoftwareVersionHasLanguageSettings;
};
