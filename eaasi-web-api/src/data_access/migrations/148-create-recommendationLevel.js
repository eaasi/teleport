'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('recommendation_level', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			recommendationLevelLabel: {
				type: Sq.STRING,
				primaryKey: true,
				allowNull: false
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('recommendation_level');
	}
};
