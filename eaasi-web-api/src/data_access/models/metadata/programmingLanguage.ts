'use strict';

const Sequelize = require('sequelize');

class ProgrammingLanguage extends Sequelize.Model {}
module.exports = (sequelize) => {
	ProgrammingLanguage.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		programmingLanguageID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		programmingLanguageQID: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		programmingLanguageLabel: {
			type: Sequelize.STRING,
			allowNull: false
		}
	}, { sequelize, tableName: 'programmingLanguage' });

	return ProgrammingLanguage;
};
