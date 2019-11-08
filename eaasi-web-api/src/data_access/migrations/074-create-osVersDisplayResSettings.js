'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('os_version_display_resolution_settings', {
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
			displayResolutionID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'display_resolution',
					key: 'id'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('os_version_display_resolution_settings');
	}
};
