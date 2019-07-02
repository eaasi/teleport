const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configuredGpuDevice', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			configuredMachine_machineID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'configuredMachine',
					key: 'configuredMachineID'
				}
			},
			configuredGpuDevice_gpuDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'gpuDevice',
					key: 'gpuDeviceID'
				}
			},
			configuredGpuDevice_memoryBytes: {
				type: Sq.INTEGER,
				allowNull: true
			},
			configuredGpuDevice_irq: {
				type: Sq.STRING,
				allowNull: true
			},
			configuredGpuDevice_usesMachineInterface: {
				type: Sq.INTEGER,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configuredGpuDevice');
	}
};
