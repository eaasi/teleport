'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('networkComputingService_expectedService', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			networkComputingEnvironment_networkEnvironmentID: {
				type: Sq.STRING,
				allowNull: true
			},
			networkComputingEnvironment_computingEnvironmentID: {
				type: Sq.STRING,
				allowNull: true
			},
			networkComputingEnvironment_expectedService: {
				type: Sq.INTEGER,
				allowNull: true
			},
			networkComputingEnvironment_servicePortExpected: {
				type: Sq.STRING,
				allowNull: true
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('networkComputingService_expectedService');
	}
};
