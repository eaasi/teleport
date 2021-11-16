'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('network_device_has_driver_software', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			networkDeviceID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'network_device',
					key: 'id'
				}
			},
			driverSoftwareID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'software_version',
					key: 'id'
				}
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('networkDevice_has_driver_software');
		return queryInterface.dropTable('network_device_has_driver_software');
	}
};
