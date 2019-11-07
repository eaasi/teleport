'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('osVersion_keyboard_layout_settings', {
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
			keyboardLayoutID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'keyboard_layout',
					key: 'id'
				}
			},
			osVersion_keyboardLayoutName: {
				type: Sq.STRING,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('os_version_keyboard_layout_settings');
	}
};
