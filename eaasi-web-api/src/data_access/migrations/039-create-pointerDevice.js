'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('pointer_device', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			pointerDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			pointerDeviceQID: {
				type: Sq.STRING,
				allowNull: true
			},
			pointerDeviceLabel: {
				type: Sq.STRING,
				allowNull: false
			},
			pointerDeviceType: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'pointer_device_type',
					key: 'id'
				}
			}
		});
	},
	down: (queryInterface, Sq) => {
		return queryInterface.dropTable('pointer_device');
	}
};
