'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('software_version_has_language_settings', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareVersion_softwareVersionID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'software_version',
					key: 'id'
				}
			},
			softwareVersion_languageQID: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'language',
					key: 'qid'
				}
			},
			softwareVersion_defaultLanguage: {
				type: Sq.BOOLEAN,
				allowNull: true,
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('software_version_has_language_settings');
	}
};
