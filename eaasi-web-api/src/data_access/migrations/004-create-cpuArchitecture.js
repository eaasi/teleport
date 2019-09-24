'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('cpuArchitecture', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			cpuArchitectureID: {
				type: Sequelize.INTEGER,
				primaryKey: true
			},
			cpuArchitectureQID: {
				type: Sq.STRING,
				allowNull: false,
			},
			cpuArchitectureLabel: {
				type: Sq.STRING,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('cpuArchitecture');
	}
};
