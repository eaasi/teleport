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
			audioDeviceID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'audio_device',
					key: 'id'
				}
			},
			irq: {
				type: Sq.STRING(64),
				allowNull: false
			},
			uses_MachineInterface: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'machine_interface',
					key: 'id'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configured_audio_device');
	}
};

