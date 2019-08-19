'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('networkDevice_has_driverSoftware', {
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
		return queryInterface.dropTable('networkDevice_has_driverSoftware');
	}
};
