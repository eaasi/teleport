'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('timezoneLabel', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			timezoneQID: {
				type: Sq.STRING(45),
				allowNull: false,
			},
			timezone_timezoneLabel: {
				type: Sq.STRING,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('timezoneLabel');
	}
};
