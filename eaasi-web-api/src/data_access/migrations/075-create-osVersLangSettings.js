'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('os_version_language_settings', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			osVersion_osVersionID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				references: {
					model: 'os_version',
					key: 'id'
				}
			},
			osVersion_languageQID: {
				type: Sq.INTEGER,
				allowNull: true
			},
			osVersion_DefaultLanguage: {
				type: Sq.BOOLEAN,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('os_version_language_settings');
	}
};
