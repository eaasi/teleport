'use strict';

import {ConfiguredMachine} from './configuredMachine';
import {ConfiguredNetwork} from './configuredNetwork';
import {StorageDevice} from './storageDevice';

const Sequelize = require('sequelize');

class ConfiguredStorageDevice extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			configuredMachine_machineID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'configuredMachine',
					key: 'configuredMachineID'
				}
			},
			configureStorageDevice_storageDeviceID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'storageDevice',
					key: 'storageDeviceID'
				}
			},
			configuredStorageDevice_usesMachineInterface: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			configuredStorageDevice_idBootOrder: {
				type: Sequelize.INTEGER,
				allowNull: false
			}
		}, { sequelize, tableName: 'configuredStorageDevice' });
	};

	static associate(models) {
		ConfiguredStorageDevice.hasOne(ConfiguredMachine, {foreignKey: 'configuredMachineID'});
		ConfiguredStorageDevice.hasOne(StorageDevice, {foreignKey: 'storageDeviceID'});
	}
};

module.exports = {
	ConfiguredStorageDevice: ConfiguredStorageDevice
};
