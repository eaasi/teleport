'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('content_object', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			localID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			idSource: {
				type: Sq.STRING(64),
				allowNull: true
			},
			name: {
				type: Sq.STRING(64),
				allowNull: true
			},
			productKey: {
				type: Sq.STRING(128),
				allowNull: true
			},
			helpText: {
				type: Sq.TEXT,
				allowNull: true
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('content_object');
	}
};
