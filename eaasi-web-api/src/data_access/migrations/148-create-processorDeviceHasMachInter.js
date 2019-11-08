'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('processor_device_has_machine_interface', {
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
			machineInterfaceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'machine_interface',
					key: 'id'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('processor_device_has_machine_interface');
	}
};
