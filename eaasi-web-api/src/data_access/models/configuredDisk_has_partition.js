'use strict';

const Sequelize = require('sequelize');

class ConfiguredDiskHasPartition extends Sequelize.Model {}

module.exports = sequelize => {

	ConfiguredDiskHasPartition.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		configuredDiskPartition_diskImageFileID: {
			type: Sequelize.STRING,
			allowNull: true
		},
		configuredDiskPartition_softwareEnvironmentID: {
			type: Sequelize.STRING,
			allowNull: true
		},
		configuredDiskPartition_fileSystemID: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		configuredDiskPartition_startupDisk: {
			type: Sequelize.BOOLEAN,
			allowNull: true
		},
	}, { sequelize, tableName: 'configuredDisk_has_partition' });
	return ConfiguredDiskHasPartition;
};
