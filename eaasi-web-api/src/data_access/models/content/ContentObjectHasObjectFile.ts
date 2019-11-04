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
			type: Sequelize.STRING,
			allowNull: false,
			references: {
				model: 'File.ts',
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
			type: Sequelize.INTEGER,
			allowNull: true
		},
	}, { sequelize, tableName: 'contentObject_has_objectFile' });
	return ContentObjectHasObjectFile;
};
