'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('pointer_device_has_driver_software', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			pointerDevice_pointerDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'pointer_device',
					key: 'id'
				}
			},
			pointerDevice_driverSoftwareID: {
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
		return queryInterface.dropTable('pointer_device_has_driver_software');
	}
};
