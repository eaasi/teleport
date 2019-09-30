'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configuredDisk', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			configuredDisk_diskImageFileID: {
				type: Sq.STRING,
				allowNull: false,
				primaryKey: true,
			},
			configuredDisk_machineID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'configuredMachine',
					key: 'configuredMachineID'
				}
			},
			configuredDisk_storageDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'storageDevice',
					key: 'storageDeviceID'
				}
			},
			configuredDisk_uses_machineInterfaceID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'machineInterface',
					key: 'machineInterfaceID'
				}
			},
			configuredDisk_diskVolume: {
				type: Sq.INTEGER,
				allowNull: true
			},
			configuredDisk_remainingVolume: {
				type: Sq.INTEGER,
				allowNull: true
			},
			configuredDisk_volumeUnit: {
				type: Sq.STRING,
				allowNull: true
			},
			configuredDisk_bootOrder: {
				type: Sq.INTEGER,
				allowNull: true
			},
			configuredDisk_irq: {
				type: Sq.INTEGER,
				allowNull: true
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configuredDisk');
	}
};
