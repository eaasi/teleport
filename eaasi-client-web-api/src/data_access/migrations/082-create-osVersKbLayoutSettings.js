const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('osVersionKeyboardLayoutSettings', {
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
			osVersion_keyboardLayoutQID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'keyboardLayout',
					key: 'keyboardLayoutQID'
				}
			},
			osVersion_keyboardLayoutName: {
				type: Sq.STRING,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('osVersionKeyboardLayoutSettings');
	}
};
