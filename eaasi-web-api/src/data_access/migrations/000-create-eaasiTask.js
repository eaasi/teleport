'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('eaasi_task', {
			id: {
				type: Sq.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			taskId: {
				type: Sq.STRING(128),
				allowNull: false,
			},
			description: {
				type: Sq.STRING(128),
				allowNull: true
			},
			isDone: {
				type: Sq.BOOLEAN,
				allowNull: false
			},
			status: {
				type: Sq.STRING(128),
				allowNull: true
			},
			message: {
				type: Sq.STRING(128),
				allowNull: true
			},
			userData: {
				type: Sq.JSONB,
				allowNull: true
			},
			object: {
				type: Sq.JSONB,
				allowNull: true
			},
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE
		})
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('eaasi_task');
	}
};
