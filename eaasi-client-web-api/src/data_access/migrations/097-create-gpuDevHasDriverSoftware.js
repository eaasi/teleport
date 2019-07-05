const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('gpuDevice_has_driverSoftware', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			networkDevice_networkDeviceID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'networkDevice',
					key: 'networkDeviceID'
				}
			},
			driverSoftware_driverSoftware: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'softwareVersion',
					key: 'softwareVersionID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('gpuDevice_has_driverSoftware');
	}
};
