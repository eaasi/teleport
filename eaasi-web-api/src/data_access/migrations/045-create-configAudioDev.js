'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configured_audio_device', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			configuredMachine_machineID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'configured_machine',
					key: 'id'
				}
			},
			configuredAudioDevice_audioDeviceID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'audio_device',
					key: 'id'
				}
			},
			configuredAudioDevice_irq: {
				type: Sq.STRING,
				allowNull: false
			},
			configuredAudioDevice_usesMachineInterface: {
				type: Sq.INTEGER,
				allowNull: true
			}

		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configured_audio_device');
	}
};

