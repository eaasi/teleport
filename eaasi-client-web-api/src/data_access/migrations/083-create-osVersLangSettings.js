const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('osVersionLanguageSettings', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			osVersion_osVersionID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				references: {
					model: 'osVersion',
					key: 'osVersionID'
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
		return queryInterface.dropTable('osVersionLanguageSettings');
	}
};
