'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configured_disk', {
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
					model: 'configured_machine',
					key: 'id'
				}
			},
			configuredDisk_storageDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'storage_device',
					key: 'id'
				}
			},
			configuredDisk_uses_machineInterfaceID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'machine_interface',
					key: 'id'
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
		return queryInterface.dropTable('configured_disk');
	}
};
