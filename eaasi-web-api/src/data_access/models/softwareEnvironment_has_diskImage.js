'use strict';

const Sequelize = require('sequelize');

class SoftwareEnvironmentHasDiskImage extends Sequelize.Model {}
module.exports = (sequelize) => {
	SoftwareEnvironmentHasDiskImage.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		softwareEnvironment_softwareEnvironmentID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'softwareEnvironment',
				key: 'softwareEnvironmentID'
			}
		},
		diskImageID: {
			type: Sequelize.STRING,
			allowNull: true
		},
		mountPoint: {
			type: Sequelize.STRING,
			allowNull: true
		},
		fileSystem: {
			type: Sequelize.STRING,
			allowNull: true,
			references: {
				model: 'fileSystem',
				key: 'fileSystemQID'
			}
		},
		storageCapacityBytes: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		storageUsedBytes: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		storageRemainingBytes: {
			type: Sequelize.INTEGER,
			allowNull: true
		}
	}, { sequelize, tableName: 'softwareEnvironment_has_diskImage' });
	SoftwareEnvironmentHasDiskImage.associate = models => {
		models.SoftwareEnvironmentHasDiskImage.hasOne(models.SoftwareEnvironment, {foreignKey: 'softwareEnvironmentID'});
		models.SoftwareEnvironmentHasDiskImage.hasOne(models.FileSystem, {foreignKey: 'fileSystemQID'});
	};
	return SoftwareEnvironmentHasDiskImage;
};
