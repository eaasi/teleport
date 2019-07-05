const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('systemRequirements_includes_gpuDevice', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			systemRequirements_systemRequirementsID: {
				type: Sq.INTEGER,
				allowNull: false
			},
			systemRequirements_gpuDeviceID: {
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
		return queryInterface.dropTable('systemRequirements_includes_gpuDevice');
	}
};
