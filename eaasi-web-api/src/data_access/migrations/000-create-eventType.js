'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('eventType', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			eventTypeLabel: {
				type: Sq.STRING,
				allowNull: false,
				primaryKey: true
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('eventType');
	}
};
