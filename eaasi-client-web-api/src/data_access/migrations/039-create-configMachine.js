const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configuredMachine', {
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
					model: 'machineType',
					key: 'machineTypeID'
				}
			},
			configuredMachineRamBytes: {
				type: Sq.STRING,
				allowNull: false
			},
			configuredMachineArchitecture: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'cpuArchitecture',
					key: 'cpuArchitectureQID'
				}
			},
			configuredMachineCpuCores: {
				type: Sq.STRING,
				allowNull: true
			},
			configuredMachine_emulatorSoftwareID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'softwareVersion',
					key: 'softwareVersionID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configuredMachine');
	}
};
