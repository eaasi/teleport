'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('pointerDevice', {
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
					model: 'pointerDeviceType',
					key: 'pointerDeviceTypeID'
				}
			}
		});
	},
	down: (queryInterface, Sq) => {
		return queryInterface.dropTable('pointerDevice');
	}
};
