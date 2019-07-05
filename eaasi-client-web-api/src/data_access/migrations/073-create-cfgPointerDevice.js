'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configuredPointerDevice', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			configuredMachine_machineID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'configuredMachine',
					key: 'configuredMachineID'
				}
			},
			configuredPointerDevice_pointerDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'pointerDevice',
					key: 'pointerDeviceID'
				}
			},
			configuredPointerDevice_usesMachineInterface: {
				type: Sq.INTEGER,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configuredPointerDevice');
	}
};
