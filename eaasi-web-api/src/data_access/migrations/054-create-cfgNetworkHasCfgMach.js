'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configured_network_has_configured_machine', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			configuredNetwork_configuredNetworkID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'configured_network',
					key: 'id'
				}
			},
			configuredNetwork_machineID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'configured_machine',
					key: 'id',
				},
			},
			bootOrder: {
				type: Sq.INTEGER,
				allowNull: false
			},
			staticIpAddress: {
				type: Sq.STRING,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configured_network_has_configured_machine');
	}
};
