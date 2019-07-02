const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('timezone', {
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
