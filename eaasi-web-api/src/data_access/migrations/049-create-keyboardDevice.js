'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('keyboardDevice', {
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
					model: 'keyboardLayout',
					key: 'keyboardLayoutID'
				}
			},
			keyboardDevice_keyboardLanguage: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'language',
					key: 'languageQID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('keyboardDevice');
	}
};
