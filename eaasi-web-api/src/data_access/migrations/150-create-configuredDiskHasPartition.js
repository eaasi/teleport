'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configuredDisk_has_partition', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			configuredDiskPartition_diskImageFileID: {
				type: Sq.STRING,
				allowNull: true
			},
			configuredDiskPartition_softwareEnvironmentID: {
				type: Sq.STRING,
				allowNull: true
			},
			configuredDiskPartition_fileSystemID: {
				type: Sq.INTEGER,
				allowNull: true
			},
			configuredDiskPartition_startupDisk: {
				type: Sq.BOOLEAN,
				allowNull: true
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configuredDisk_has_partition');
	}
};
