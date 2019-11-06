'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('software_environment_has_event', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareEnvironment_softwareEnvironmentID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'software_environment',
					key: 'id'
				}
			},
			event_eventID: {
				type: Sq.INTEGER,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('software_environment_has_event');
	}
};
