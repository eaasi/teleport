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
			autoIncrement: true
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
			allowNull: false
		},
		processorDeviceFrequencyUnit: {
			type: Sequelize.STRING,
			allowNull: false
		},
		processorDeviceCpuArchitecture: {
			type: Sequelize.STRING,
			allowNull: false
		},
	}, { sequelize, tableName: 'processorDevice' });
	return ProcessorDevice;
};
