'use strict';

const Sequelize = require('sequelize');

class ConfiguredMachine extends Sequelize.Model {}

module.exports = (sequelize) => {
	ConfiguredMachine.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,

		configuredMachineID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},

		configuredMachineName: {
			type: Sequelize.STRING,
			allowNull: false
		},

		configuredMachineDescription: {
			type: Sequelize.STRING,
			allowNull: false
		},

		configuredMachineDateTime: {
			type: Sequelize.DATE,
			allowNull: false
		},

		configuredMachineType: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'machineType',
				key: 'machineTypeID'
			}
		},

		configuredMachineRAM: {
			type: Sequelize.INTEGER,
		},

		configuredMachineRAMUnit: {
			type: Sequelize.STRING,
			references: {
				model: 'frequencyUnit',
				key: 'frequencyUnitLabel'
			}
		},

		configuredMachineCpuCores: {
			type: Sequelize.STRING,
			allowNull: true
		},

		configuredMachine_emulatorSoftwareID: {
			type: Sequelize.STRING,
			allowNull: true,
			references: {
				model: 'softwareVersion',
				key: 'softwareVersionID'
			}
		},

		configuredMachineProcessor: {
			type: Sequelize.STRING,
			allowNull: true,
			references: {
				model: 'processorDevice',
				key: 'processorDeviceID'
			}
		},

		configuredMachineChipset: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'chipset',
				key: 'chipsetID'
			}
		},

		configuredMachine_romFileID: {
			type: Sequelize.STRING,
			allowNull: true,
		}
	}, { sequelize, tableName: 'configuredMachine' });
	ConfiguredMachine.associate = models  => {
		models.ConfiguredMachine.hasOne(models.SoftwareVersion, {foreignKey: 'softwareVersionID'});
		models.ConfiguredMachine.hasOne(models.CpuArchitecture, {foreignKey: 'cpuArchitectureQID'});
		models.ConfiguredMachine.hasOne(models.MachineType, {foreignKey: 'machineTypeID'});
	};

	return ConfiguredMachine;
};
