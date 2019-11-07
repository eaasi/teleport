'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('system_requirements_requires_keyboard_device', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			systemRequirementsID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'system_requirements',
					key: 'id'
				}
			},
			keyboardDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'keyboard_device',
					key: 'id'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('system_requirements_requires_keyboard_device');
	}
};
