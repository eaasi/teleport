'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('display_device_has_driver_software', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			displayDevice_displayDeviceID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'display_device',
					key: 'id'
				}
			},
			displayDevice_driverSoftwareID: {
				type: Sequelize.STRING,
				allowNull: false,
				references: {
					model: 'software_version',
					key: 'id'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('display_device_has_driver_software');
	}
};
