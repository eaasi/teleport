'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('storageDevice_has_machineInterface', {
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
			storageDevice_machineInterfaceID: {
				type: Sq.INTEGER,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('storageDevice_has_machineInterface');
	}
};
