'use strict';

const Sequelize = require('sequelize');

class Agent extends Sequelize.Model {}

module.exports = (sequelize) => {
	Agent.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		agentID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		agentName: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		isOrg: Boolean
	},
	{
		sequelize,
		tableName: 'agent'
	});

	return Agent;
};
