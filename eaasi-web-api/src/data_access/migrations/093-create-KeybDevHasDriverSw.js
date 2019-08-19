'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('keyboardDevice_has_driverSoftware', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			keyboardDevice_keyboardDeviceID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'keyboardDevice',
					key: 'keyboardDeviceID'
				}
			},
			keyboardDevice_driverSoftware: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'softwareVersion',
					key: 'softwareVersionID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('keyboardDevice_has_driverSoftware');
	}
};
