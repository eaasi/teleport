'use strict';

import {SoftwareEnvironment} from './softwareEnvironment';
import {FileSystem} from './fileSystem';

const Sequelize = require('sequelize');

class SoftwareEnvironmentHasDiskImage extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
	};

	static associate(models) {
		SoftwareEnvironmentHasDiskImage.hasOne(SoftwareEnvironment, {foreignKey: 'softwareEnvironmentID'});
		SoftwareEnvironmentHasDiskImage.hasOne(FileSystem, {foreignKey: 'fileSystemQID'});
	}
}

module.exports = {
	SoftwareEnvironmentHasDiskImage: SoftwareEnvironmentHasDiskImage
};
