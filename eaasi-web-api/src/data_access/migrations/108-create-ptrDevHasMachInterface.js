'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('pointer_device_has_machine_interface', {
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
			pointerDevice_machineInterfaceID: {
				type: Sq.INTEGER,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('pointer_device_has_machine_interface');
	}
};
