const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configuredNetwork_has_configuredMachine', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			configuredNetwork_configuredNetworkID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'configuredNetwork',
					key: 'configuredNetworkID'
				}
			},
			configuredNetwork_machineID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'configuredMachine',
					key: 'configuredMachineID',
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
		return queryInterface.dropTable('configuredNetwork_has_configuredMachine');
	}
};
