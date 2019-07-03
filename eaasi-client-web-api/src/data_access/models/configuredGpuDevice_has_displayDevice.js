'use strict';

import {DisplayDevice} from './displayDevice';
import {ConfiguredGpuDevice} from './complete/configuredGpuDevice';

const Sequelize = require('sequelize');

class ConfiguredGpuDeviceHasDisplayDevice extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			configuredMachine_machineID: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			configuredGpuDevice_gpuDeviceID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'configuredGpuDevice',
					key: 'configuredGpuDevice_gpuDeviceID'
				}
			},
			configuredGpuDevice_displayDeviceID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'displayDevice',
					key: 'displayDeviceID'
				}
			},
			displayDevice_usesDisplayInterface: {
				type: Sequelize.INTEGER,
				allowNull: false
			}
		}, { sequelize, tableName: 'configuredGpuDeviceHasDisplayDevice' });
	};

	static associate(models) {
		ConfiguredGpuDeviceHasDisplayDevice.hasOne(DisplayDevice, {foreignKey: 'displayDeviceID'});
		ConfiguredGpuDeviceHasDisplayDevice.hasOne(ConfiguredGpuDevice, {foreignKey: 'configuredNetworkID'});
	}
}

module.exports = {
	ConfiguredGpuDeviceHasDisplayDevice: ConfiguredGpuDeviceHasDisplayDevice
};
