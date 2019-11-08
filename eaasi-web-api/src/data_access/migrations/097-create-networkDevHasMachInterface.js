'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('network_device_has_machine_interface', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			networkDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'network_device',
					key: 'id'
				}
			},
			machineInterfaceID: {
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
		return queryInterface.dropTable('network_device_has_machine_interface');
	}
};
