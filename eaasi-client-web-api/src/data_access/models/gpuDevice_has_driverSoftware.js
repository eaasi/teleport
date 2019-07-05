'use strict';

import {GpuDevice} from './gpuDevice';

const Sequelize = require('sequelize');

class GpuDeviceHasDriverSoftware extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
			gpuDevice_driverSoftwareID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'softwareVersion',
					key: 'softwareVersionID'
				}
			}
		}, { sequelize, tableName: 'gpuDevice_has_displayInterface' });
	};

	static associate(models) {
		GpuDeviceHasDriverSoftware.hasOne(GpuDevice, {foreignKey: 'gpuDeviceID'});
	}
};

module.exports = {
	GpuDeviceHasDriverSoftware: GpuDeviceHasDriverSoftware
};
