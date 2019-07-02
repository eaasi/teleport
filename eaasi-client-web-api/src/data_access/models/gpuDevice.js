'use strict';

const Sequelize = require('sequelize');

class GpuDevice extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
	};

	static associate(models) {
	}
};

module.exports = {
	GpuDevice: GpuDevice
};
