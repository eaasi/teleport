const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('timezone_has_timezoneName', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			timezone_timezoneQID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'timezone',
					key: 'timezoneQID'
				}
			},
			timezoneName_timezoneNameID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'timezoneName',
					key: 'timezoneNameID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('timezone_has_timezoneName');
	}
};
