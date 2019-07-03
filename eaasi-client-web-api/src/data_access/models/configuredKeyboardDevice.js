'use strict';

import {KeyboardDevice} from './keyboardDevice';
import {ConfiguredMachine} from './configuredMachine';

const Sequelize = require('sequelize');

class ConfiguredKeyboardDevice extends Sequelize.Model {
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
			configuredKeyboardDevice_keyboardDeviceID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'keyboardDevice',
					key: 'keyboardDeviceID'
				}
			},
			configuredKeyboardDevice_usesMachineInterface: {
				type: Sequelize.INTEGER,
				allowNull: true
			}
		}, { sequelize, tableName: 'configuredGpuDeviceHasDisplayDevice' });
	};

	static associate(models) {
		ConfiguredKeyboardDevice.hasOne(ConfiguredMachine, {foreignKey: 'configuredMachineID'});
		ConfiguredKeyboardDevice.hasOne(KeyboardDevice, {foreignKey: 'keyboardDeviceID'});
	}
}

module.exports = {
	ConfiguredKeyboardDevice: ConfiguredKeyboardDevice
};
