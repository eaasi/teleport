'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('os_version_keyboard_layout_settings', {
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
			keyboardLayoutQid: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'keyboard_layout',
					key: 'qid'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('os_version_keyboard_language_settings');
	}
};
