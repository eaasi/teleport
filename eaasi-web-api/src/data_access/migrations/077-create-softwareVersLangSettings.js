'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('software_version_language_settings', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareVersion_versionID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'software_version',
					key: 'id'
				}
			},
			softwareVersion_languageQID: {
				type: Sq.STRING,
				allowNull: false
			},
			osVersion_defaultLanguage: {
				type: Sq.BOOLEAN,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('software_version_language_settings');
	}
};
