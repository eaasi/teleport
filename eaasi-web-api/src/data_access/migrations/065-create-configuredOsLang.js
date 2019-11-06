'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configured_os_language', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			configuredOS_configuredOperatingSystemID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'configured_os',
					key: 'id'
				}
			},
			configuredOs_languageQID: {
				type: Sq.STRING,
				allowNull: true
			},
			configuredOS_primaryLanguage: {
				type: Sq.BOOLEAN,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configured_os_language');
	}
};
