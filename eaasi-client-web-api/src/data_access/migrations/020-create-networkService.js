const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('networkService', {
			networkServiceID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			networkServiceName: {
				type: Sq.STRING,
				allowNull: false
			},
			networkServiceQID: {
				type: Sq.STRING,
				allowNull: true
			},
			defaultPort: {
				type: Sq.STRING,
				allowNull: true
			},
			defaultPortRange: {
				type: Sq.STRING,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('networkService');
	}
};
