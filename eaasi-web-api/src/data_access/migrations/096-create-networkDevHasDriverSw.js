'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('networkDevice_has_driver_software', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			networkDevice_networkDeviceID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'network_device',
					key: 'id'
				}
			},
			driverSoftware_driverSoftware: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'software_version',
					key: 'id'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('network_device_has_driver_software');
	}
};
