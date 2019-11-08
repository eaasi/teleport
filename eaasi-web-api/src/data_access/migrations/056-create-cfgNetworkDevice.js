'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configured_network_device', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			configuredMachineID: {
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
			macAddress: {
				type: Sq.INTEGER,
				allowNull: true
			},
			uses_machineInterfaceID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'machine_interface',
					key: 'id'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configured_network_device');
	}
};
