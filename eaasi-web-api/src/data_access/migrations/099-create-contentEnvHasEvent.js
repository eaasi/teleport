'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('contentEnvironment_has_event', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			contentEnvironment_contentEnvironment_computingEnvironmentID: {
				type: Sq.INTEGER,
				allowNull: false,
			},
			contentEnvironment_contentEnvironment_digitalContentID: {
				type: Sq.INTEGER,
				allowNull: true
			},
			event_eventID: {
				type: Sq.INTEGER,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('contentEnvironment_has_event');
	}
};
