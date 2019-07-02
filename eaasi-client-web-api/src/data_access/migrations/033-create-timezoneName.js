const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('timezoneName', {
			timezoneNameID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true
			},
			timeZoneName: {
				type: Sq.STRING,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('timezoneName');
	}
};
