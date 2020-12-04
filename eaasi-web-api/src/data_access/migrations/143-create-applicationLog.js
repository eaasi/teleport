'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('application_log', {
			id: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			createdAt: {
				type: Sq.DATE,
				defaultValue: new Date()
			},
			updatedAt: {
				type: Sq.DATE,
				defaultValue: new Date()
			},
			level: {
				type: Sq.STRING(16),
				allowNull: false,
				columnName: 'level'
			},
			message: {
				type: Sq.JSONB,
				allowNull: true,
				columnName: 'message'
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('application_log');
	}
};
