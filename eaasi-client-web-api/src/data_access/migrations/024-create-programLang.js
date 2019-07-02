const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('programmingLanguage', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			programmingLanguageQID: {
				type: Sq.STRING,
				allowNull: false,
				primaryKey: true
			},
			programmingLanguageName: {
				type: Sq.STRING,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('programmingLanguage');
	}
};
