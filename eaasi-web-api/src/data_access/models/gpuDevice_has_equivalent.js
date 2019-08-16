'use strict';

const Sequelize = require('sequelize');

class GpuDeviceHasEquivalent extends Sequelize.Model {}

module.exports = (sequelize) => {
	GpuDeviceHasEquivalent.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		gpuDevice_gpuDeviceID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'gpuDevice',
				key: 'gpuDeviceID'
			}
		},
		gpuDevice_equivalentGpuDevice: {
			type: Sequelize.INTEGER,
			allowNull: false
		}
	}, { sequelize, tableName: 'gpuDevice_has_equivalent' });
	GpuDeviceHasEquivalent.associate = models => {
		models.GpuDeviceHasEquivalent.hasOne(models.GpuDevice, {foreignKey: 'gpuDeviceID'});
	};
	return GpuDeviceHasEquivalent;
};
