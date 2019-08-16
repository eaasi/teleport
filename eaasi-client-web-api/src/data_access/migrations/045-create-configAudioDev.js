'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configuredAudioDevice', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			configuredMachine_machineID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'configuredMachine',
					key: 'configuredMachineID'
				}
			},
			configuredAudioDevice_audioDeviceID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'audioDevice',
					key: 'audioDeviceID'
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
		return queryInterface.dropTable('configuredAudioDevice');
	}
};

