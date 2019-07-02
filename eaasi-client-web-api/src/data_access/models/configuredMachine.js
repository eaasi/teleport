'use strict';

import {SoftwareVersion} from './softwareVersion';
import {CpuArchitecture} from './cpuArchitecture';
import {MachineType} from './machineType';

const Sequelize = require('sequelize');

class ConfiguredMachine extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
	};

	static associate(models) {
		ConfiguredMachine.hasOne(SoftwareVersion, {foreignKey: 'softwareVersionID'});
		ConfiguredMachine.hasOne(CpuArchitecture, {foreignKey: 'cpuArchitectureQID'});
		ConfiguredMachine.hasOne(MachineType, {foreignKey: 'machineTypeID'});
	}
}

module.exports = {
	ConfiguredMachine: ConfiguredMachine
};
