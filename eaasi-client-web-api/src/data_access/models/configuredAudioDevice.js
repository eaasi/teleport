'use strict';

const Sequelize = require('sequelize');

class ConfiguredAudioDevice extends Sequelize.Model {}

module.exports = sequelize => {
	ConfiguredAudioDevice.init({
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

	ConfiguredAudioDevice.associate = models => {
		models.ConfiguredAudioDevice.hasOne(models.AudioDevice, {foreignKey: 'audioDeviceID'});
		models.ConfiguredAudioDevice.hasOne(models.ConfiguredMachine, {foreignKey: 'configuredMachine'});
	};
};
