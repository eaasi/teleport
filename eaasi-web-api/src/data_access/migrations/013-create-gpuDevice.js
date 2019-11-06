'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('gpu_device', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			gpuDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			gpuDeviceQID: {
				type: Sq.STRING,
				allowNull: true
			},
			gpuDeviceName: {
				type: Sq.STRING,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('gpu_device');
	}
};
