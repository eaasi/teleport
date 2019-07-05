'use strict';

import {GpuDevice} from './gpuDevice';

const Sequelize = require('sequelize');

class SystemRequirementsIncludesGpuDevice extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
		}, { sequelize, tableName: 'pointerDevice' });
	};

	static associate(models) {
		SystemRequirementsIncludesGpuDevice.hasOne(
			GpuDevice, {foreignKey: 'gpuDeviceID'});
	}
}

module.exports = {
	SystemRequirementsIncludesGpuDevice: SystemRequirementsIncludesGpuDevice
};
