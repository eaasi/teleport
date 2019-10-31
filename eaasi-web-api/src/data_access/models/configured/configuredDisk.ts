'use strict';

const Sequelize = require('sequelize');

class ConfiguredDisk extends Sequelize.Model {}

module.exports = sequelize => {

	ConfiguredDisk.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		configuredDisk_diskImageFileID: {
			type: Sequelize.STRING,
			allowNull: false,
			primaryKey: true,
		},
		configuredDisk_machineID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'configuredMachine',
				key: 'configuredMachineID'
			}
		},
		configuredDisk_storageDeviceID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'storageDevice',
				key: 'storageDeviceID'
			}
		},
		configuredDisk_uses_machineInterfaceID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'machineInterface',
				key: 'machineInterfaceID'
			}
		},
		configuredDisk_diskVolume: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		configuredDisk_remainingVolume: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		configuredDisk_volumeUnit: {
			type: Sequelize.STRING,
			allowNull: true
		},
		configuredDisk_bootOrder: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		configuredDisk_irq: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
	}, { sequelize, tableName: 'configuredDisk' });
	return ConfiguredDisk;
};
