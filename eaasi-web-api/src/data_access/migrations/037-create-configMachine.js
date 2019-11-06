'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configured_machine', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,

			configuredMachineID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},

			configuredMachineName: {
				type: Sq.STRING,
				allowNull: false
			},

			configuredMachineDescription: {
				type: Sq.STRING,
				allowNull: false
			},

			configuredMachineDateTime: {
				type: Sq.DATE,
				allowNull: false
			},

			configuredMachineType: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'machine_type',
					key: 'id'
				}
			},

			configuredMachineRAM: {
				type: Sq.INTEGER,
			},

			configuredMachineRAMUnit: {
				type: Sq.STRING,
			},

			configuredMachineCpuCores: {
				type: Sq.STRING,
				allowNull: true
			},

			configuredMachine_emulatorSoftwareID: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'software_version',
					key: 'id'
				}
			},

			configuredMachineProcessor: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'processor_device',
					key: 'id'
				}
			},

			configuredMachineChipset: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'chipset',
					key: 'id'
				}
			},

			configuredMachine_romFileID: {
				type: Sq.STRING,
				allowNull: true,
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configured_machine');
	}
};
