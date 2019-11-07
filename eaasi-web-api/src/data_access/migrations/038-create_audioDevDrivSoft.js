'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('audio_device_has_driver_software', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			audioDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'audio_device',
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
		return queryInterface.dropTable('audio_device_has_driver_software');
	}
};
