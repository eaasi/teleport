'use strict';

const Sequelize = require('sequelize');

class SoftwareObjectHasObjectFile extends Sequelize.Model {}
module.exports = (sequelize) => {
	SoftwareObjectHasObjectFile.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		softwareObject_softwareObjectID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'softwareObject',
				key: 'softwareObjectID'
			}
		},
		softwareObjectFileID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'file',
				key: 'fileID'
			}
		},
		softwareObjectFileLabel: {
			type: Sequelize.STRING,
			allowNull: true
		},
		softwareObjectFile_usesMountFormat: {
			type: Sequelize.STRING,
			allowNull: true,
			references: {
				model: 'mountFormat',
				key: 'mountFormatQID'
			}
		}
	}, { sequelize, tableName: 'softwareObject_has_objectFile' });
	SoftwareObjectHasObjectFile.associate = models => {

		models.SoftwareObjectHasObjectFile.hasOne(models.SoftwareObject, {foreignKey: 'softwareObjectID'});
		models.SoftwareObjectHasObjectFile.hasOne(models.File, {foreignKey: 'fileID'});
		models.SoftwareObjectHasObjectFile.hasOne(models.MountFormat, {foreignKey: 'mountFormatQID'});
	};
	return SoftwareObjectHasObjectFile;
};
