'use strict';

const Sequelize = require('sequelize');

class OsVersionHasProgrammingLanguage extends Sequelize.Model {}
module.exports = (sequelize) => {
	OsVersionHasProgrammingLanguage.init({
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
		osVersion_programmingLanguageID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'programmingLanguage',
				key: 'programmingLanguageID'
			}
		}
	}, { sequelize, tableName: 'osVersion_has_programmingLanguage' });
	OsVersionHasProgrammingLanguage.associate = models => {

		models.OsVersionHasProgrammingLanguage.hasOne(models.OsVersion,
			{foreignKey: 'osVersionID'});
		models.OsVersionHasProgrammingLanguage.hasOne(models.ProgrammingLanguage,
			{foreignKey: 'programmingLanguageID'});
	};

	return OsVersionHasProgrammingLanguage;
};
