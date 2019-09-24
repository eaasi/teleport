'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('systemRequirements_requires_osVersion', {
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
			systemRequirements_requiresOsVersionID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'osVersion',
					key: 'osVersionID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('systemRequirements_requires_osVersion');
	}
};
