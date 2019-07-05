'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configuredMachine_has_event', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			configuredMachine_machineID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'configuredMachine',
					key: 'configuredMachineID'
				}
			},
			event_eventID: {
				type: Sq.INTEGER,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configuredMachine_has_event');
	}
};
