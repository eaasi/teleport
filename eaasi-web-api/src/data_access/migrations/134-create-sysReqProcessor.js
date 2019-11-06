'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('system_requirements_requires_processor', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			systemRequirements_systemRequirementsID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'system_requirements',
					key: 'id'
				}
			},
			systemRequirements_requiresProcessorID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'processor_device',
					key: 'id'
				}
			},
			systemRequirements_minimumFrequency: {
				type: Sq.INTEGER,
				allowNull: true,
			},
			systemRequirements_minimumFrequencyUnit: {
				type: Sq.STRING,
				allowNull: true,
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('system_requirements_requires_processor');
	}
};

