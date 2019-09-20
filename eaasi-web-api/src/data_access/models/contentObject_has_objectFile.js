'use strict';

const Sequelize = require('sequelize');

class ContentObjectHasObjectFile extends Sequelize.Model {}
module.exports = (sequelize) => {
	ContentObjectHasObjectFile.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		contentObject_contentObjectLocalID: {
			type: Sequelize.STRING,
			allowNull: false,
			references: {
				model: 'contentObject',
				key: 'contentObjectLocalID'
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
		contentObjectFile_mediaTypeName: {
			type: Sequelize.STRING,
			allowNull: true
		},
		contentObjectFile_order: {
			type: Sequelize.STRING,
			allowNull: true
		},
	}, { sequelize, tableName: 'contentObject_has_objectFile' });
	ContentObjectHasObjectFile.associate = models => {
		models.ContentObjectHasObjectFile.hasOne(models.ContentObject, {foreignKey: 'contentObjectID'});
		models.ContentObjectHasObjectFile.hasOne(models.File, {foreignKey: 'fileID'});
	};
	return ContentObjectHasObjectFile;
};
