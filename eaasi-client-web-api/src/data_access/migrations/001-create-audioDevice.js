const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('audioDevice', {
			audioDevice_audioDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
			},
			audioDevice_machineInterfaceID: {
				type: Sq.INTEGER,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('audioDevice');
	}
};
