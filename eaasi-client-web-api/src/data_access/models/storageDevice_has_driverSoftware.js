'use strict';

const Sequelize = require('sequelize');

class StorageDeviceHasDriverSoftware extends Sequelize.Model {}
	module.exports = (sequelize) => {
	StorageDeviceHasDriverSoftware.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		storageDevice_storageDeviceID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'storageDevice',
				key: 'storageDeviceID'
			}
		},
		storageDevice_driverSoftwareID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'softwareVersion',
				key: 'softwareVersionID'
			}
		}
	}, { sequelize, tableName: 'storageDevice_has_driverSoftware' });

	StorageDeviceHasDriverSoftware.associate = models => {
		models.StorageDeviceHasDriverSoftware.hasOne(models.StorageDevice, {foreignKey: 'storageDeviceID'});
		models.StorageDeviceHasDriverSoftware.hasOne(models.SoftwareVersion, {foreignKey: 'softwareVersionID'});
	}

	return StorageDeviceHasDriverSoftware;
}
