'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('timezone_label', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			timezone_timezoneQID: {
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
		return queryInterface.dropTable('timezone_label');
	}
};
