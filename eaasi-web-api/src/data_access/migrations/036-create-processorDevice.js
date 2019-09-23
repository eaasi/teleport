'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('processorDevice', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			processorDeviceID: {
				type: Sq.STRING(45),
				allowNull: false,
				primaryKey: true,
			},
			processorDeviceQID: {
				type: Sq.STRING,
				allowNull: true
			},
			processorDeviceName: {
				type: Sq.STRING,
				allowNull: false
			},
			processorDeviceFrequency: {
				type: Sq.INTEGER,
				allowNull: true
			},
			processorDeviceFrequencyUnit: {
				type: Sq.STRING,
				allowNull: true
			},
			processorDeviceCpuArchitecture: {
				type: Sq.STRING,
				allowNull: true
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('processorDevice');
	}
};
