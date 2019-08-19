'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('osVersion_languageSettings', {
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
		return queryInterface.dropTable('osVersion_languageSettings');
	}
};
