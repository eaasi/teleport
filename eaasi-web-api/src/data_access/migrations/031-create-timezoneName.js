'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('timezoneName', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
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
