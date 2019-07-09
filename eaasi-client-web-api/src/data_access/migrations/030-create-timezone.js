'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('timezone', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			timezoneQID: {
				type: Sq.STRING,
				allowNull: false,
				primaryKey: true
			},
			utcOffset: {
				type: Sq.STRING,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('timezone');
	}
};
