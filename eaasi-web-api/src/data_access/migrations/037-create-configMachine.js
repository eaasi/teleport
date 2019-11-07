'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configured_machine', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,

			id: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},

			name: {
				type: Sq.STRING(64),
				allowNull: false
			},

			description: {
				type: Sq.STRING(256),
				allowNull: false
			},

			datetime: {
				type: Sq.DATE,
				allowNull: false
			},

			machineTypeID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'machine_type',
					key: 'id'
				}
			},

			ram: {
				type: Sq.INTEGER,
			},

			ramUnit: {
				type: Sq.STRING(64),
			},

			cpuCores: {
				type: Sq.INTEGER,
				allowNull: true
			},

			emulatorSoftwareID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'software_version',
					key: 'id'
				}
			},

			processorDeviceID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'processor_device',
					key: 'id'
				}
			},

			chipsetID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'chipset',
					key: 'id'
				}
			},

			romFileID: {
				type: Sq.INTEGER,
				allowNull: true,
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configured_machine');
	}
};
