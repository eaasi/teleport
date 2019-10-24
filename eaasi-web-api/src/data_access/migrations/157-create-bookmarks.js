'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('bookmarks', {
			userID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: false
			},
			resourceID: {
				type: Sq.INTEGER,
				allowNull: false
			}
		})
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('bookmarks');
	}
};