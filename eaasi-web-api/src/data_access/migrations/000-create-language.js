'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('language', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			languageQID: {
				type: Sq.STRING,
				allowNull: false,
				primaryKey: true
			},
			languageLabel: {
				type: Sq.STRING,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('language');
	}
};
