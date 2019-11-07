'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('network_service', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			id: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			name: {
				type: Sq.STRING(64),
				allowNull: false
			},
			qid: {
				type: Sq.STRING(64),
				allowNull: true
			},
			defaultPort: {
				type: Sq.STRING(12),
				allowNull: true
			},
			defaultPortRange: {
				type: Sq.STRING(32),
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('network_service');
	}
};
