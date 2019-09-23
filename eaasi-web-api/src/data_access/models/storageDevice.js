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
		storageDeviceReadable: {
			type: Sequelize.BOOLEAN,
			allowNull: true
		},
		storageDeviceWritable: {
			type: Sequelize.BOOLEAN,
			allowNull: true
		},
	}, { sequelize, tableName: 'storageDevice' });
	StorageDevice.associate = models => {
		models.StorageDevice.hasOne(models.StorageDeviceType, {foreignKey: 'storageDeviceTypeID'});
	};

	return StorageDevice;
};
