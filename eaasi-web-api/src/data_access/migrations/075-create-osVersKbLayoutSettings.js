'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('osVersion_keyboard_layout_settings', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			osVersion_osVersionID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'os_version',
					key: 'id'
				}
			},
			osVersion_keyboardLayoutQID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'keyboard_layout',
					key: 'qid'
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
