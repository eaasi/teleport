'use strict';

const Sequelize = require('sequelize');

class GpuDeviceHasDisplayInterface extends Sequelize.Model {}

module.exports = (sequelize) => {
	GpuDeviceHasDisplayInterface.init({
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
		displayInterface_displayInterfaceID: {
			type: Sequelize.INTEGER,
			allowNull: false
		}
	}, { sequelize, tableName: 'gpuDevice_has_displayInterface' });
	GpuDeviceHasDisplayInterface.associate = models => {
		models.GpuDeviceHasDisplayInterface.hasOne(models.GpuDevice, {foreignKey: 'gpuDeviceID'});
	};
	return GpuDeviceHasDisplayInterface;
};
