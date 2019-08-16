'use strict';

const Sequelize = require('sequelize');

class StorageDevice extends Sequelize.Model {}
module.exports = (sequelize) => {
	StorageDevice.init({
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
	StorageDevice.associate = models => {
		models.StorageDevice.hasOne(models.StorageDeviceType, {foreignKey: 'storageDeviceTypeID'});
		models.StorageDevice.hasOne(models.ReadWriteStatus, {foreignKey: 'readWriteStatusID'});
	};

	return StorageDevice;
};
