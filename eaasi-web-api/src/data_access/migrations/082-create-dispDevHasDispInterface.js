'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('display_device_has_display_interface', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			displayDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'display_device',
					key: 'id'
				}
			},
			displayInterfaceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'display_interface',
					key: 'id'
				}
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('display_device_has_display_interface');
	}
};
