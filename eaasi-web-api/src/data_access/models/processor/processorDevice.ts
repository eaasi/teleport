'use strict';

const Sequelize = require('sequelize');

class ProcessorDevice extends Sequelize.Model {}
module.exports = (sequelize) => {
	ProcessorDevice.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		processorDeviceID: {
			type: Sequelize.STRING(45),
			allowNull: false,
			primaryKey: true,
		},
		processorDeviceQID: {
			type: Sequelize.STRING,
			allowNull: true
		},
		processorDeviceName: {
			type: Sequelize.STRING,
			allowNull: false
		},
		processorDeviceFrequency: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		processorDeviceFrequencyUnit: {
			type: Sequelize.STRING,
			allowNull: true
		},
		processorDeviceCpuArchitecture: {
			type: Sequelize.STRING,
			allowNull: true
		},
	}, { sequelize, tableName: 'processorDevice' });
	return ProcessorDevice;
};
