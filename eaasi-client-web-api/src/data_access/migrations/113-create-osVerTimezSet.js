'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('osVersion_timezoneSettings', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			osVersion_osVersionID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'osVersion',
					key: 'osVersionID'
				}
			},
			osVersion_timezoneQID: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'timezone',
					key: 'timezoneQID'
				}
			},
			osVersion_timezoneName: {
				type: Sq.STRING,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('osVersion_timezoneSettings');
	}
};
