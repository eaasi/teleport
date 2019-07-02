'use strict';

import {AudioDevice} from './audioDevice';
import {ConfiguredMachine} from './configuredMachine';

const Sequelize = require('sequelize');

class ConfiguredAudioDevice extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			configuredMachine_machineID: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'configuredMachine',
					key: 'configuredMachineID'
				}
			},
			configuredAudioDevice_audioDeviceID: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'audioDevice',
					key: 'audioDeviceID'
				}
			},
			configuredAudioDevice_irq: {
				type: Sequelize.STRING,
				allowNull: false
			},
			configuredAudioDevice_usesMachineInterface: {
				type: Sequelize.INTEGER,
				allowNull: true
			}
		}, { sequelize, tableName: 'configuredAudioDevice' });
	};

	static associate(models) {
		ConfiguredAudioDevice.hasOne(AudioDevice, {foreignKey: 'audioDeviceID'});
		ConfiguredAudioDevice.hasOne(ConfiguredMachine, {foreignKey: 'configuredMachine'});
	}
}

module.exports = {
	ConfiguredAudioDevice: ConfiguredAudioDevice
};
