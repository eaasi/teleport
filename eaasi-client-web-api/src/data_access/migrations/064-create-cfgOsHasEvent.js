const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configuredOS_has_event', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			configuredOS_configuredOperatingSystemID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'configuredOS',
					key: 'configuredOperatingSystemID'
				}
			},
			event_eventID: {
				type: Sq.INTEGER,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configuredOS_has_event');
	}
};
