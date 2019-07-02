const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('cpuArchitecture', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			cpuArchitectureQID: {
				type: Sq.STRING,
				allowNull: false,
				primaryKey: true
			},
			cpuArchitectureName: {
				type: Sq.STRING,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('cpuArchitecture');
	}
};
