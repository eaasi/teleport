'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('displayDevice', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			displayDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			displayDeviceQID: {
				type: Sq.STRING,
				allowNull: true
			},
			displayDeviceName: {
				type: Sq.STRING,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('displayDevice');
	}
};
