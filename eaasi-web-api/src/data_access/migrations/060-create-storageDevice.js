'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('storage_device', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			id: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			qid: {
				type: Sq.STRING(64),
				allowNull: true
			},
			label: {
				type: Sq.STRING(128),
				allowNull: false
			},
			storageDeviceTypeID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'storage_device_type',
					key: 'id'
				}
			},
			isReadable: {
				type: Sq.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			isWritable: {
				type: Sq.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('storage_device');
	}
};
