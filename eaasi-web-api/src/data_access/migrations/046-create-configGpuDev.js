'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configured_gpu_device', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			configuredGpuDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			configuredMachine_machineID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'configured_machine',
					key: 'id'
				}
			},
			configuredGpuDevice_gpuDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'gpu_device',
					key: 'id'
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
		return queryInterface.dropTable('configured_gpu_device');
	}
};
