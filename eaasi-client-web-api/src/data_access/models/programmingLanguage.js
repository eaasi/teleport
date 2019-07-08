'use strict';

const Sequelize = require('sequelize');

class ProgrammingLanguage extends Sequelize.Model {}
	module.exports = (sequelize) => {
	ProgrammingLanguage.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		programmingLanguageQID: {
			type: Sequelize.STRING,
			allowNull: false,
			primaryKey: true
		},
		programmingLanguageName: {
			type: Sequelize.STRING,
			allowNull: false
		}
	}, { sequelize, tableName: 'programmingLanguage' });

	return ProgrammingLanguage;
};
