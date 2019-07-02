const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('networkDevice', {
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
		return queryInterface.dropTable('networkDevice');
	}
};
