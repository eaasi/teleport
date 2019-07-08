'use strict';

const Sequelize = require('sequelize');

class ConfiguredStorageDevice extends Sequelize.Model {}

module.exports = (sequelize) => {
	ConfiguredStorageDevice.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		configuredMachine_machineID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'configuredMachine',
				key: 'configuredMachineID'
			}
		},
		configureStorageDevice_storageDeviceID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'storageDevice',
				key: 'storageDeviceID'
			}
		},
		configuredStorageDevice_usesMachineInterface: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		configuredStorageDevice_idBootOrder: {
			type: Sequelize.INTEGER,
			allowNull: false
		}
	}, { sequelize, tableName: 'configuredStorageDevice' });
	ConfiguredStorageDevice.associate = models => {
		models.ConfiguredStorageDevice.hasOne(models.ConfiguredMachine, {foreignKey: 'configuredMachineID'});
		models.ConfiguredStorageDevice.hasOne(models.StorageDevice, {foreignKey: 'storageDeviceID'});
	}
	return ConfiguredStorageDevice;
};
