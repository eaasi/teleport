'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('processor_device_has_driver_software', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			processorDeviceID: {
				type: Sq.STRING(45),
				allowNull: false,
			},
			processorDevice_driverSoftwareID: {
				type: Sq.STRING,
				allowNull: false,
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('processor_device_has_driver_software');
	}
};
