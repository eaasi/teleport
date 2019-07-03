'use strict';

import {DisplayDevice} from './displayDevice';
import {ConfiguredGpuDevice} from './configuredGpuDevice';

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
					key: 'configuredGpuDeviceID'
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
		ConfiguredGpuDeviceHasDisplayDevice.hasOne(ConfiguredGpuDevice, {foreignKey: 'configuredGpuDeviceID'});
	}
}

module.exports = {
	ConfiguredGpuDeviceHasDisplayDevice: ConfiguredGpuDeviceHasDisplayDevice
};
