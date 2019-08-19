'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('osVersion_keyboardSetting', {
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
					model: 'osVersion',
					key: 'osVersionID'
				}
			},
			osVersion_keyboardSettingLayout: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'keyboardLayout',
					key: 'keyboardLayoutQID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('osVersion_keyboardSetting');
	}
};
