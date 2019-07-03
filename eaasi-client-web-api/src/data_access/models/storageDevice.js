'use strict';

import {StorageDeviceType} from './storageDeviceType';
import {ReadWriteStatus} from './readWriteStatus';

const Sequelize = require('sequelize');

class StorageDevice extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			storageDeviceID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			storageDeviceQID: {
				type: Sequelize.STRING,
				allowNull: true
			},
			storageDeviceName: {
				type: Sequelize.STRING,
				allowNull: false
			},
			storageDeviceType: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'storageDeviceType',
					key: 'storageDeviceTypeID'
				}
			},
			storageVolumeBytes: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			storageDevice_readWriteStatusID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'readWriteStatus',
					key: 'readWriteStatusID'
				}
			}
		}, { sequelize, tableName: 'storageDevice' });
	};

	static associate(models) {
		StorageDevice.hasOne(StorageDeviceType, {foreignKey: 'storageDeviceTypeID'});
		StorageDevice.hasOne(ReadWriteStatus, {foreignKey: 'readWriteStatusID'});
	}
};

module.exports = {
	StorageDevice: StorageDevice
};
