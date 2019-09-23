'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('softwareVersion_has_languageSettings', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareVersion_softwareVersionID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'softwareVersion',
					key: 'softwareVersionID'
				}
			},
			softwareVersion_languageQID: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'language',
					key: 'languageQID'
				}
			},
			softwareVersion_defaultLanguage: {
				type: Sq.BOOLEAN,
				allowNull: true,
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('softwareVersion_has_languageSettings');

	}
};
