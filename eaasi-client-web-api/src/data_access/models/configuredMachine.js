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
		configuredMachineRamBytes: {
			type: Sequelize.STRING,
			allowNull: false
		},
		configuredMachineArchitecture: {
			type: Sequelize.STRING,
			allowNull: true,
			references: {
				model: 'cpuArchitecture',
				key: 'cpuArchitectureQID'
			}
		},
		configuredMachineCpuCores: {
			type: Sequelize.STRING,
			allowNull: true
		},
		configuredMachine_emulatorSoftwareID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'softwareVersion',
				key: 'softwareVersionID'
			}
		}
	}, { sequelize, tableName: 'configuredMachine' });
	ConfiguredMachine.associate = models  => {
		models.ConfiguredMachine.hasOne(models.SoftwareVersion, {foreignKey: 'softwareVersionID'});
		models.ConfiguredMachine.hasOne(models.CpuArchitecture, {foreignKey: 'cpuArchitectureQID'});
		models.ConfiguredMachine.hasOne(models.MachineType, {foreignKey: 'machineTypeID'});
	};

	return ConfiguredMachine;
};
