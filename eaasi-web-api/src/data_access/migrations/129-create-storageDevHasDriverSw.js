'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('storage_device_has_driver_software', {
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
			storageDevice_driverSoftwareID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'software_version',
					key: 'id'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('storage_device_has_driver_software');
	}
};
