'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('storageDeviceType', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			storageDeviceTypeID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			storageDeviceTypeQID: {
				type: Sq.STRING,
				allowNull: true
			},
			storageDeviceTypeLabel: {
				type: Sq.STRING,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('storageDeviceType');
	}
};
