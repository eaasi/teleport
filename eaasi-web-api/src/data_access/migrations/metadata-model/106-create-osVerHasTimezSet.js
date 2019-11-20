'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('os_version_has_timezone_settings', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			osVersionID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'os_version',
					key: 'id'
				}
			},
			timezoneQid: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'timezone',
					key: 'qid'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('os_version_has_timezone_settings');
	}
};
