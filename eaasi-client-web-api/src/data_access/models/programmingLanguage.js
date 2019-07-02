'use strict';

const Sequelize = require('sequelize');

class ProgrammingLanguage extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
	};

	static associate(models) {
	}
};

module.exports = {
	ProgrammingLanguage: ProgrammingLanguage
};
