'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('systemRequirements_requires_gpuDevice', {
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
					model: 'gpuDevice',
					key: 'gpuDeviceID'
				}
			},
			systemRequirements_minimumGpuRAM: {
				type: Sq.STRING,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('systemRequirements_requires_gpuDevice');
	}
};
