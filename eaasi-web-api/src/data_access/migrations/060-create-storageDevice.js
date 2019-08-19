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
			storageDeviceName: {
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
			storageVolumeBytes: {
				type: Sq.INTEGER,
				allowNull: true
			},
			storageDevice_readWriteStatusID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'readWriteStatus',
					key: 'readWriteStatusID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('storageDevice');
	}
};
