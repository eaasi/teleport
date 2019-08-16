'use strict';

const Sequelize = require('sequelize');

class SystemRequirementsIncludesGpuDevice extends Sequelize.Model {}
module.exports = (sequelize) => {
	SystemRequirementsIncludesGpuDevice.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		systemRequirements_systemRequirementsID: {
			type: Sequelize.INTEGER,
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
			type: Sequelize.STRING,
			allowNull: true
		}
	}, { sequelize, tableName: 'systemRequirements_includes_gpuDevice' });
	SystemRequirementsIncludesGpuDevice.associate = models => {
		models.SystemRequirementsIncludesGpuDevice.hasOne(models.GpuDevice, {foreignKey: 'gpuDeviceID'});
	};

	return SystemRequirementsIncludesGpuDevice;
};
