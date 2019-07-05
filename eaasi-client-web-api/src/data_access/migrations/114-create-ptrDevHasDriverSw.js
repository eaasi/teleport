const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('pointerDevice_has_driverSoftware', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			pointerDevice_pointerDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'pointerDevice',
					key: 'pointerDeviceID'
				}
			},
			pointerDevice_driverSoftwareID: {
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
		return queryInterface.dropTable('pointerDevice_has_driverSoftware');
	}
};
