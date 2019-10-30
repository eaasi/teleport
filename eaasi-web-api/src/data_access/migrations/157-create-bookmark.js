'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('bookmark', {
			id: {
				type: Sq.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			userID: {
				type: Sq.INTEGER,
				allowNull: false
			},
			resourceID: {
				type: Sq.STRING,
				allowNull: false
			},
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE
		})
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('bookmark');
	}
};