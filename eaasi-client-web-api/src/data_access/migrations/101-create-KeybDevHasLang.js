const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('keyboardDevice_has_language', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			keyboardDevice_keyboardDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'keyboardDevice',
					key: 'keyboardDeviceID'
				}
			},
			keyboardDevice_languageQID: {
				type: Sq.STRING,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('keyboardDevice_has_language');
	}
};
