'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('storage_device_has_machine_interface', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			storageDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'storage_device',
					key: 'id'
				}
			},
			machineInterfaceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'machine_interface',
					key: 'id'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('storage_device_has_machine_interface');
	}
};
