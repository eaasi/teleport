'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('system_requirements_requires_gpu_device', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			systemRequirements_systemRequirementsID: {
				type: Sq.STRING,
				allowNull: false
			},
			systemRequirements_requiresGpuDeviceID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'gpu_device',
					key: 'id'
				}
			},
			systemRequirements_minimumGpuRAM: {
				type: Sq.DECIMAL,
				allowNull: true
			},
			systemRequirements_minimumGpuRAMUnit: {
				type: Sq.STRING,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('system_requirements_requires_gpu_device');
	}
};
