'use strict';

const Sequelize = require('sequelize');

class GpuDevice extends Sequelize.Model {}
module.exports = (sequelize) => {
	GpuDevice.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		gpuDeviceID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		gpuDeviceQID: {
			type: Sequelize.STRING,
			allowNull: true
		},
		gpuDeviceName: {
			type: Sequelize.STRING,
			allowNull: false
		}
	}, { sequelize, tableName: 'gpuDevice' });
	return GpuDevice;
};
