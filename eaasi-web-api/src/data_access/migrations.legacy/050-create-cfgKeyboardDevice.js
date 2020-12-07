'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configured_keyboard_device', {
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
			keyboardDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'keyboard_device',
					key: 'id'
				}
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
		return queryInterface.dropTable('configured_keyboard_device');
	}
};
