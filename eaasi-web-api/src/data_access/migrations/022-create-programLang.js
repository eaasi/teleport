'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('programming_language', {
			programmingLanguageID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true
			},
			programmingLanguageQID: {
				type: Sq.STRING,
				allowNull: true,
			},
			programmingLanguageLabel: {
				type: Sq.STRING,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('programming_language');
	}
};
