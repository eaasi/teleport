'use strict'

const Sequelize = require('sequelize');

class SoftwareVersionHasProgrammingLanguage extends Sequelize.Model {}
	module.exports = (sequelize) => {
	SoftwareVersionHasProgrammingLanguage.init({
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
		softwareVersion_programmingLanguageQID: {
			type: Sequelize.STRING,
			allowNull: true,
			references: {
				model: 'programmingLanguage',
				key: 'programmingLanguageQID'
			}
		}
	}, { sequelize, tableName: 'pointerDevice' });
	SoftwareVersionHasProgrammingLanguage.associate = models => {
		models.SoftwareVersionHasProgrammingLanguage.hasOne(models.SoftwareVersion, {foreignKey: 'softwareVersion'});
		models.SoftwareVersionHasProgrammingLanguage.hasOne(models.ProgrammingLanguage, {foreignKey: 'programmingLanguage'});
	};

	return SoftwareVersionHasProgrammingLanguage;
}
