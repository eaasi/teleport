'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configured_network_machine_expected_network_service', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			configuredNetworkMachine_configuredNetworkID: {
				type: Sq.INTEGER,
				allowNull: true
			},
			servicePortExpected: {
				type: Sq.STRING,
				allowNull: true
			},
			configuredNetworkMachine_expectedNetworkServiceID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'network_service',
					key: 'id'
				}
			},
			configuredNetworkMachine_configuredMachineID: {
				type: Sq.INTEGER,
				allowNull: true,
				// references: {
				// 	model: 'configuredNetwork_has_configuredMachine',
				// 	key: 'configuredNetwork_machineID'
				// }
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configured_network_machine_expected_network_service');
	}
};


