'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('machine_recommendation', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareVersionID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'software_version',
					key: 'id'
				}
			},
			emulatorProjectID: {
				type: Sq.STRING,
				allowNull: true
			},
			recommendedMachineID: {
				type: Sq.INTEGER,
				allowNull: true,
			},
			recommendationLevel: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'recommendation_level',
					key: 'id'
				}
			},
			description: {
				type: Sq.STRING(256),
				allowNull: true
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('machine_recommendation');
	}
};
