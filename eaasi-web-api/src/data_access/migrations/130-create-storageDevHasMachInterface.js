'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('storage_device_has_machine_interface', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			storageDevice_storageDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'storage_device',
					key: 'id'
				}
			},
			storageDevice_machineInterfaceID: {
				type: Sq.INTEGER,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('storage_device_has_machine_interface');
	}
};
