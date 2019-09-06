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
			level: {
				type: Sq.STRING(16),
				allowNull: false,
				columnName: 'level'
			},
			source: {
				type: Sq.STRING(64),
				allowNull: true,
				columnName: 'source'
			},
			message: {
				type: Sq.STRING,
				allowNull: false,
				columnName: 'message'
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('application_log');
	}
};
