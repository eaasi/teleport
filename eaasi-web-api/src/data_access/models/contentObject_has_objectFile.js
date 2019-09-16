'use strict';

const Sequelize = require('sequelize');

class ContentObjectHasObjectFile extends Sequelize.Model {}
module.exports = (sequelize) => {
	ContentObjectHasObjectFile.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		contentObject_contentObjectID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'contentObject',
				key: 'contentObjectID'
			}
		},
		contentObjectFileID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'file',
				key: 'fileID'
			}
		},
		contentObjectFileLabel: {
			type: Sequelize.STRING,
			allowNull: true
		},
		contentObjectFile_usesMountFormat: {
			type: Sequelize.STRING,
			allowNull: true,
			references: {
				model: 'mountFormat',
				key: 'mountFormatQID'
			}
		}
	}, { sequelize, tableName: 'contentObject_has_objectFile' });
	ContentObjectHasObjectFile.associate = models => {
		models.ContentObjectHasObjectFile.hasOne(models.ContentObject, {foreignKey: 'contentObjectLocalID'});
		models.ContentObjectHasObjectFile.hasOne(models.File, {foreignKey: 'fileID'});
		models.ContentObjectHasObjectFile.hasOne(models.MountFormat, {foreignKey: 'mountFormatQID'});
	};
	return ContentObjectHasObjectFile;
};
