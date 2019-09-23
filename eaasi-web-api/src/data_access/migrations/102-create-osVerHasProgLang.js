'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('osVersion_has_programmingLanguage', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			osVersion_osVersionID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'osVersion',
					key: 'osVersionID'
				}
			},
			osVersion_programmingLanguageID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'programmingLanguage',
					key: 'programmingLanguageID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('osVersion_has_programmingLanguage');
	}
};
