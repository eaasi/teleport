'use strict';

const Sequelize = require('sequelize');

class ProcessorDevice extends Sequelize.Model {}
module.exports = (sequelize) => {
	ProcessorDevice.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		processorDevice_processorDeviceID: {
			type: Sequelize.STRING(45),
			allowNull: false,
		},
		processorDevice_machineInterfaceID: {
			type: Sequelize.INTEGER,
			allowNull: false,
		}
	}, { sequelize, tableName: 'processorDevice_has_machineInterfaceID' });
	return ProcessorDevice;
};
