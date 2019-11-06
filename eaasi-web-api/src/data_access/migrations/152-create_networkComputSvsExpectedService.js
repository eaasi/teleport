'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('network_computing_service_expected_service', {
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
		return queryInterface.dropTable('network_computing_service_expected_service');
	}
};
