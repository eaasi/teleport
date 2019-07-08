'use strict';

const Sequelize = require('sequelize');

class GpuDeviceHasMachineInterface extends Sequelize.Model {}
	module.exports = (sequelize) => {
	GpuDeviceHasMachineInterface.init({
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
			gpuDevice_machineInterfaceID: {
				type: Sequelize.INTEGER,
				allowNull: false
			}
		}, { sequelize, tableName: 'gpuDevice_has_machineInterface' });
	GpuDeviceHasMachineInterface.associate = models => {
		models.GpuDeviceHasMachineInterface.hasOne(models.GpuDevice, {foreignKey: 'gpuDeviceID'});
	};
};
