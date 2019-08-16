'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('digitalObject', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			digitalObjectID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			digitalObjectName: {
				type: Sq.STRING,
				allowNull: true
			},
			digitalObjectDescription: {
				type: Sq.STRING,
				allowNull: true
			},
			digitalObjectProductKey: {
				type: Sq.STRING,
				allowNull: true
			},
			digitalObjectHelpText: {
				type: Sq.TEXT,
				allowNull: true
			},
			digitalObjectSystemRequirements: {
				type: Sq.INTEGER,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('digitalObject');
	}
};
