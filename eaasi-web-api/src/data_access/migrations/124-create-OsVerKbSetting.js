'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('os_version_keyboard_setting', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			osVersion_keyboardSettingLanguage: {
				type: Sq.STRING,
				allowNull: false
			},
			osVersion_keyboardSettingName: {
				type: Sq.STRING,
				allowNull: true
			},
			osVersion_osVersionID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'os_version',
					key: 'id'
				}
			},
			osVersion_keyboardSettingLayout: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'keyboard_layout',
					key: 'id'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('os_version_keyboard_setting');
	}
};
