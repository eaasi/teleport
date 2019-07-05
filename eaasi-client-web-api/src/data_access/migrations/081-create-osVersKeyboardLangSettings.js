const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('osVersionKeyboardLanguageSettings', {
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
			osVersion_keyboardLanguageQID: {
				type: Sq.STRING,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('osVersionKeyboardLanguageSettings');
	}
};
