'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('storageDevice', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			storageDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			storageDeviceQID: {
				type: Sq.STRING,
				allowNull: true
			},
			storageDeviceLabel: {
				type: Sq.STRING,
				allowNull: false
			},
			storageDeviceType: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'storageDeviceType',
					key: 'storageDeviceTypeID'
				}
			},
			storageDeviceReadable: {
				type: Sq.BOOLEAN,
				allowNull: true
			},
			storageDeviceWritable: {
				type: Sq.BOOLEAN,
				allowNull: true
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('storageDevice');
	}
};
