'use strict';

const Sequelize = require('sequelize');

class SystemRequirementsRequiresGpuDevice extends Sequelize.Model {}
module.exports = (sequelize) => {
	SystemRequirementsRequiresGpuDevice.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		systemRequirements_systemRequirementsID: {
			type: Sequelize.STRING,
			allowNull: false
		},
		systemRequirements_gpuDeviceID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'gpuDevice',
				key: 'gpuDeviceID'
			}
		},
		systemRequirements_minimumGpuRAM: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		systemRequirements_minimumGpuRAMUnit: {
			type: Sequelize.STRING,
			allowNull: true
		}
	}, { sequelize, tableName: 'systemRequirements_requires_gpuDevice' });
	SystemRequirementsRequiresGpuDevice.associate = models => {
		models.SystemRequirementsRequiresGpuDevice.hasOne(models.GpuDevice, {foreignKey: 'gpuDeviceID'});
	};

	return SystemRequirementsRequiresGpuDevice;
};
