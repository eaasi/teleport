'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configured_network_machine_expected_network_service', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			configuredNetworkID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'configured_network',
					key: 'id'
				}
			},
			configuredMachineID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'configured_machine',
					key: 'id'
				}
			},
			expectedNetworkServiceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'network_service',
					key: 'id'
				}
			},
			servicePortExpected: {
				type: Sq.STRING,
				allowNull: true
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configured_network_machine_expected_network_service');
	}
};


