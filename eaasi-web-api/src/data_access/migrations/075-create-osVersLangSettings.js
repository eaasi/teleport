'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('os_version_language_settings', {
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
			languageQID: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'language',
					key: 'qid'
				}
			},
			isDefaultLanguage: {
				type: Sq.BOOLEAN,
				allowNull: false,
				defaultValue: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('os_version_language_settings');
	}
};
