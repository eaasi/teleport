'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('network_device', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			networkDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			networkDeviceQID: {
				type: Sq.STRING,
				allowNull: true
			},
			networkDeviceName: {
				type: Sq.STRING,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('network_device');
	}
};
