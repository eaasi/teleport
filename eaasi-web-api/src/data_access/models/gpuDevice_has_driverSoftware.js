'use strict';

const Sequelize = require('sequelize');

class GpuDeviceHasDriverSoftware extends Sequelize.Model {}

module.exports = (sequelize) => {
	GpuDeviceHasDriverSoftware.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		gpuDevice_gpuDeviceID: {
			type: Sequelize.STRING,
			allowNull: false,
			references: {
				model: 'gpuDevice',
				key: 'gpuDeviceID'
			}
		},
		gpuDevice_driverSoftwareID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'softwareVersion',
				key: 'softwareVersionID'
			}
		}
	}, { sequelize, tableName: 'gpuDevice_has_displayInterface' });
	GpuDeviceHasDriverSoftware.associate = models => {
		models.GpuDeviceHasDriverSoftware.hasOne(models.GpuDevice, {foreignKey: 'gpuDeviceID'});
		models.GpuDeviceHasDriverSoftware.hasOne(models.SoftwareVersion, {foreignKey: 'softwareVersionID'});
	};
	return GpuDeviceHasDriverSoftware;
};
