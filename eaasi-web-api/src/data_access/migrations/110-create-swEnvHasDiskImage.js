'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('softwareEnvironment_has_diskImage', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareEnvironment_softwareEnvironmentID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'softwareEnvironment',
					key: 'softwareEnvironmentID'
				}
			},
			diskImageID: {
				type: Sq.STRING,
				allowNull: true
			},
			mountPoint: {
				type: Sq.STRING,
				allowNull: true
			},
			fileSystem: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'fileSystem',
					key: 'fileSystemID'
				}
			},
			storageCapacityBytes: {
				type: Sq.INTEGER,
				allowNull: true
			},
			storageUsedBytes: {
				type: Sq.INTEGER,
				allowNull: true
			},
			storageRemainingBytes: {
				type: Sq.INTEGER,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('softwareEnvironment_has_diskImage');
	}
};
