'use strict';

const Sequelize = require('sequelize');

class ConfiguredGpuDevice extends Sequelize.Model {}

module.exports = sequelize => {

	ConfiguredGpuDevice.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		configuredGpuDeviceID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		configuredMachine_machineID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'configuredMachine',
				key: 'configuredMachineID'
			}
		},
		configuredGpuDevice_gpuDeviceID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'gpuDevice',
				key: 'gpuDeviceID'
			}
		},
		configuredGpuDevice_memoryBytes: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		configuredGpuDevice_irq: {
			type: Sequelize.STRING,
			allowNull: true
		},
		configuredGpuDevice_usesMachineInterface: {
			type: Sequelize.INTEGER,
			allowNull: true
		}
	}, { sequelize, tableName: 'configuredGpuDevice' });

	ConfiguredGpuDevice.associate = models => {
		models.ConfiguredGpuDevice.hasOne(models.GpuDevice, {foreignKey: 'gpuDeviceID'});
		models.ConfiguredGpuDevice.hasOne(models.ConfiguredMachine, {foreignKey: 'configuredMachineID'});
	};
	return ConfiguredGpuDevice;
};
