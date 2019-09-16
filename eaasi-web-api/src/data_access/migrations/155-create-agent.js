'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('agent', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			agentID: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sq.INTEGER
			},
			agentName: {
				allowNull: false,
				type: Sq.STRING
			},
			isOrgs: Sq.BOOLEAN
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('agent');
	}
};
