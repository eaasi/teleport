'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('software_version_language_settings', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareVersionID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'software_version',
					key: 'id'
				}
			},
			languageQid: {
				type: Sq.STRING,
				allowNull: false
			},
			isDefaultLanguage: {
				type: Sq.BOOLEAN,
				allowNull: false,
				defaultValue: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('software_version_language_settings');
	}
};
