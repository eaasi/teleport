'use strict';

const Sequelize = require('sequelize');

class ConfiguredGpuDeviceHasDisplayDevice extends Sequelize.Model {}

module.exports = (sequelize) => {
	ConfiguredGpuDeviceHasDisplayDevice.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		configuredMachine_machineID: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		configuredGpuDevice_gpuDeviceID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'configuredGpuDevice',
				key: 'configuredGpuDeviceID'
			}
		},
		configuredGpuDevice_displayDeviceID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'displayDevice',
				key: 'displayDeviceID'
			}
		},
		displayDevice_usesDisplayInterface: {
			type: Sequelize.INTEGER,
			allowNull: false
		}
	}, { sequelize, tableName: 'configuredGpuDeviceHasDisplayDevice' });

	ConfiguredGpuDeviceHasDisplayDevice.associate = models => {
		models.ConfiguredGpuDeviceHasDisplayDevice.hasOne(models.DisplayDevice, {foreignKey: 'displayDeviceID'});
		models.ConfiguredGpuDeviceHasDisplayDevice.hasOne(models.ConfiguredGpuDevice, {foreignKey: 'configuredGpuDeviceID'});
	};

	return ConfiguredGpuDeviceHasDisplayDevice;
};

