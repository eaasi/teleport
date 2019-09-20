'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('machineRecommendation', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			machineRecommendation_softwareVersionID: {
				type: Sq.STRING,
				allowNull: true
			},
			machineRecommendation_emulatorProjectID: {
				type: Sq.STRING,
				allowNull: true
			},
			machineRecommendation_recommendedMachineID: {
				type: Sq.INTEGER,
				allowNull: true
			},
			machineRecommendation_recommendationLevel: {
				type: Sq.STRING,
				allowNull: true
			},
			machineRecommendation_description: {
				type: Sq.STRING,
				allowNull: true
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('machineRecommendation');
	}
};
