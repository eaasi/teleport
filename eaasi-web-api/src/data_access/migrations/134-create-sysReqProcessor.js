'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('systemRequirements_requires_processor', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			systemRequirements_systemRequirementsID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'systemRequirements',
					key: 'systemRequirementsID'
				}
			},
			systemRequirements_requiresProcessorID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'processorDevice',
					key: 'processorDeviceID'
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
		return queryInterface.dropTable('systemRequirements_requires_processor');
	}
};

