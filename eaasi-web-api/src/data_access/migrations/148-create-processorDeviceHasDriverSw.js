'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('processor_device_has_driver_software', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			processorDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'processor_device',
					key: 'id'
				}
			},
			driverSoftwareID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'software_version',
					key: 'id'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('processor_device_has_driver_software');
	}
};
