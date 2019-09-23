'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configuredSoftware_has_event', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			configuredSoftware_configuredSoftwareManifestationID: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'configuredSoftware',
					key: 'configuredSoftwareVersionID'
				}
			},
			event_eventID: {
				type: Sq.INTEGER,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configuredSoftware_has_event');
	}
};
