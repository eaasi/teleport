'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('keyboard_device_has_language', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			keyboardDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'keyboard_device',
					key: 'id'
				}
			},
			languageQid: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'language',
					key: 'qid'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('keyboard_device_has_language');
	}
};
