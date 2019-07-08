'use strict';

const Sequelize = require('sequelize');

class DigitalObjectHasObjectFile extends Sequelize.Model {}
module.exports = (sequelize) => {
	DigitalObjectHasObjectFile.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		digitalObject_digitalObjectID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'digitalObject',
				key: 'digitalObjectID'
			}
		},
		digitalObjectFileID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'file',
				key: 'fileID'
			}
		},
		digitalObjectFileLabel: {
			type: Sequelize.STRING,
			allowNull: true
		},
		digitalObjectFile_usesMountFormat: {
			type: Sequelize.STRING,
			allowNull: true,
			references: {
				model: 'mountFormat',
				key: 'mountFormatQID'
			}
		}
	}, { sequelize, tableName: 'digitalObject_has_objectFile' });
	DigitalObjectHasObjectFile.associate = models => {
		models.DigitalObjectHasObjectFile.hasOne(models.DigitalObject, {foreignKey: 'digitalObjectID'});
		models.DigitalObjectHasObjectFile.hasOne(models.File, {foreignKey: 'fileID'});
		models.DigitalObjectHasObjectFile.hasOne(models.MountFormat, {foreignKey: 'mountFormatQID'});
	}
	return DigitalObjectHasObjectFile;
};
