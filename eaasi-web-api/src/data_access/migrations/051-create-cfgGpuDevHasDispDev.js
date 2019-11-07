'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configured_gpu_device_has_display_device', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			configuredGpuDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'configured_gpu_device',
					key: 'id'
				}
			},
			displayDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'display_device',
					key: 'id'
				}
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configured_gpu_device_has_display_device');
	}
};
