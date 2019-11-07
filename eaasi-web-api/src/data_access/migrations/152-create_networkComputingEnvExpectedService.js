'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('network_computing_environment_expected_service', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			networkEnvironmentID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'network_environment',
					key: 'id'
				}
			},
			computingEnvironmentID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'computing_environment',
					key: 'id'
				}
			},
			expectedNetworkServiceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'network_service',
					key: 'id'
				}
			},
			expectedServicePort: {
				type: Sq.STRING(12),
				allowNull: true
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('network_computing_environment_expected_service');
	}
};
