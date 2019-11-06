'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('pointer_device_type', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			pointerDeviceTypeID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			pointerDeviceTypeLabel: {
				type: Sq.STRING,
				allowNull: false
			},
			pointerDeviceTypeQID: {
				type: Sq.STRING,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('pointer_device_type');
	}
};
