'use strict';

const Sequelize = require('sequelize');

class SoftwareObjectHasObjectFile extends Sequelize.Model {}
module.exports = (sequelize) => {
	SoftwareObjectHasObjectFile.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		softwareObject_softwareObjectID: {
			type: Sequelize.STRING,
			allowNull: false,
			references: {
				model: 'softwareObject',
				key: 'softwareObjectID'
			}
		},
		softwareObjectFileID: {
			type: Sequelize.STRING,
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
		softwareObjectFile_mediaTypeName: {
			type: Sequelize.STRING,
			allowNull: true
		},
		softwareObjectFile_order: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
	}, { sequelize, tableName: 'softwareObject_has_objectFile' });
	SoftwareObjectHasObjectFile.associate = models => {

		models.SoftwareObjectHasObjectFile.hasOne(models.SoftwareObject, {foreignKey: 'softwareObjectID'});
		models.SoftwareObjectHasObjectFile.hasOne(models.File, {foreignKey: 'fileID'});
	};
	return SoftwareObjectHasObjectFile;
};
