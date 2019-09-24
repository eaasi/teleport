'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('osVersion_keyboardLayoutSettings', {
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
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'keyboardLayout',
					key: 'keyboardLayoutID'
				}
			},
			osVersion_keyboardLayoutName: {
				type: Sq.STRING,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('osVersion_keyboardLayoutSettings');
	}
};
