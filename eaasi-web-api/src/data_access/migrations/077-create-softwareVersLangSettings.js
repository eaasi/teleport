'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('softwareVersion_languageSettings', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareVersion_versionID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'softwareVersion',
					key: 'softwareVersionID'
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
		return queryInterface.dropTable('softwareVersion_languageSettings');
	}
};
