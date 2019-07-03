const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configuredNetworkMachine_providesNetworkService', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			configuredNetworkMachine_configuredNetworkID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'configuredNetwork_has_configuredMachine',
					key: 'configuredNetwork_configuredNetworkID'
				}
			},
			configuredNetworkMachine_configuredMachineID: {
				type: Sq.INTEGER,
				allowNull: true
			},
			configuredNetworkMachine_providesNetworkServiceID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'networkService',
					key: 'networkServiceID'
				}
			},
			servicePortExposed: {
				type: Sq.STRING,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configuredNetworkMachine_providesNetworkService');
	}
};
