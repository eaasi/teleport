'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('developer', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			developerQID: {
				type: Sq.STRING,
				allowNull: false,
				primaryKey: true
			},
			developerName: {
				type: Sq.STRING,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('developer');
	}
};
