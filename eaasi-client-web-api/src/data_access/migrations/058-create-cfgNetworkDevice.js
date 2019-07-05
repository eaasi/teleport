'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configuredNetworkDevice', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			configuredMachine_machineID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'configuredMachine',
					key: 'configuredMachineID'
				}
			},
			configuredNetworkDevice_networkDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'networkDevice',
					key: 'networkDeviceID'
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
		return queryInterface.dropTable('configuredNetworkDevice');
	}
};
