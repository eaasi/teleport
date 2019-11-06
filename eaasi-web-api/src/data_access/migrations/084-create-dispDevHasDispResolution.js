'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('display_device_has_display_resolution', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			displayDevice_displayDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'display_device',
					key: 'id'
				}
			},
			availableDisplayResolution: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'display_resolution',
					key: 'id'
				}
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('display_device_has_display_resolution');
	}
};
