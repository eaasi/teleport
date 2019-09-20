'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('processorDevice_has_driverSoftware', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			processorDeviceID: {
				type: Sq.STRING(45),
				allowNull: false,
			},
			processorDevice_driverSoftwareID: {
				type: Sq.STRING,
				allowNull: false,
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('processorDevice_has_driverSoftware');
	}
};
