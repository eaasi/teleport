'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('systemRequirements_requires_processor', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			systemRequirements_systemRequirementsID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'systemRequirements',
					key: 'systemRequirementsID'
				}
			},
			systemRequirements_processorID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'processor',
					key: 'processorID'
				}
			},
			systemRequirements_minimumFrequency: {
				type: Sq.INTEGER,
				allowNull: false,
			},
			systemRequirements_minimumFrequencyUnit: {
				type: Sq.STRING,
				allowNull: false,
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('systemRequirements_requires_processor');
	}
};
