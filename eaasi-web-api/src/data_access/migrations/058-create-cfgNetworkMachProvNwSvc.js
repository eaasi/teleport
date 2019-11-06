'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configured_network_machine_provides_network_service', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			configuredNetworkMachine_configuredMachineID: {
				type: Sq.INTEGER,
				allowNull: true
			},
			servicePortExposed: {
				type: Sq.STRING,
				allowNull: true
			},
			configuredNetworkMachine_providesNetworkServiceID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'network_service',
					key: 'id'
				}
			},
			 configuredNetworkMachine_configuredNetworkID: {
			 	type: Sq.INTEGER,
			 	allowNull: false,
				// 	references: {
				// 		model: 'configuredNetwork_has_configuredMachine',
				// 		key: 'configuredNetwork_configuredNetworkID'
				// 	}
			 },
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configured_network_machine_provides_network_service');
	}
};
