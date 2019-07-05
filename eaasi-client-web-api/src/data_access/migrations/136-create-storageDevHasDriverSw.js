const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('storageDevice_has_driverSoftware', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			storageDevice_storageDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'storageDevice',
					key: 'storageDeviceID'
				}
			},
			storageDevice_driverSoftwareID: {
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
		return queryInterface.dropTable('storageDevice_has_driverSoftware');
	}
};
