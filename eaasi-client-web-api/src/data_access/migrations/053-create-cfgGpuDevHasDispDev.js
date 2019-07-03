const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configuredGpuDevice_has_displayDevice', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			configuredMachine_machineID: {
				type: Sq.INTEGER,
				allowNull: false
			},
			configuredGpuDevice_gpuDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'configuredGpuDevice',
					key: 'configuredGpuDevice_gpuDeviceID'
				}
			},
			configuredGpuDevice_displayDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'displayDevice',
					key: 'displayDeviceID'
				}
			},
			displayDevice_usesDisplayInterface: {
				type: Sq.INTEGER,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configuredGpuDevice_has_DisplayDevice');
	}
};
