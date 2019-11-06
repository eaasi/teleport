'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('audio_device', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			audioDeviceID: {
				primaryKey: true,
				type: Sq.INTEGER,
				allowNull: false,
			},
			audioDeviceQID: {
				type: Sq.STRING,
				allowNull: true
			},
			audioDevice_machineInterfaceID: {
				type: Sq.INTEGER,
				allowNull: true
			},
			audioDeviceName: {
				type: Sequelize.STRING,
				allowNull: false
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('audio_device');
	}
};
