'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('keyboard_device', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			keyboardDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			keyboardDeviceQID: {
				type: Sq.STRING,
				allowNull: true
			},
			keyboardDeviceName: {
				type: Sq.STRING,
				allowNull: false
			},
			keyboardDevice_keyboardLayout: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'keyboard_layout',
					key: 'id'
				}
			},
			keyboardDevice_keyboardLanguage: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'language',
					key: 'qid'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('keyboard_device');
	}
};
