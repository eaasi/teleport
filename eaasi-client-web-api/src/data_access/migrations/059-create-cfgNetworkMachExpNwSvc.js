const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configuredNetworkMachine_expectedNetworkService', {
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
					model: 'networkService',
					key: 'networkServiceID'
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
		return queryInterface.dropTable('configuredNetworkMachine_expectedNetworkService');
	}
};


