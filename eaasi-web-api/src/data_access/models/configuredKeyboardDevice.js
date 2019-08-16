'use strict';

const Sequelize = require('sequelize');

class ConfiguredKeyboardDevice extends Sequelize.Model {}

module.exports = (sequelize) => {

	ConfiguredKeyboardDevice.init({
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

	ConfiguredKeyboardDevice.associate = models => {
		models.ConfiguredKeyboardDevice.hasOne(models.ConfiguredMachine, {foreignKey: 'configuredMachineID'});
		models.ConfiguredKeyboardDevice.hasOne(models.KeyboardDevice, {foreignKey: 'keyboardDeviceID'});
	};
	return ConfiguredKeyboardDevice;
};

