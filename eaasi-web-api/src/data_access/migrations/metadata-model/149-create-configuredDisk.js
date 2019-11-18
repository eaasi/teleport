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
			configuredMachineID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'configured_machine',
					key: 'id'
				}
			},
			storageDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'storage_device',
					key: 'id'
				}
			},
			machineInterfaceID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'machine_interface',
					key: 'id'
				}
			},
			diskVolume: {
				type: Sq.INTEGER,
				allowNull: true
			},
			remainingVolume: {
				type: Sq.INTEGER,
				allowNull: true
			},
			volumeUnit: {
				type: Sq.STRING(12),
				allowNull: true
			},
			bootOrder: {
				type: Sq.INTEGER,
				allowNull: true
			},
			irq: {
				type: Sq.STRING(64),
				allowNull: true
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configured_disk');
	}
};
