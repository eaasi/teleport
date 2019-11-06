'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configured_network_device', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			configuredMachine_machineID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'configured_machine',
					key: 'id'
				}
			},
			configuredNetworkDevice_networkDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'network_device',
					key: 'id'
				}
			},
			configuredNetworkDevice_macAddress: {
				type: Sq.INTEGER,
				allowNull: true
			},
			configuredNetworkDevice_usesMachineInterface: {
				type: Sq.INTEGER,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configured_network_device');
	}
};
