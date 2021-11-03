'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('system_requirements_requires_processor_device', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			systemRequirementsID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'system_requirements',
					key: 'id'
				}
			},
			processorDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'processor_device',
					key: 'id'
				}
			},
			minimumFrequency: {
				type: Sq.INTEGER,
				allowNull: true,
			},
			minimumFrequencyUnit: {
				type: Sq.STRING(12),
				allowNull: true,
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('system_requirements_requires_processor');
		return queryInterface.dropTable('system_requirements_requires_processor_device');
	}
};

