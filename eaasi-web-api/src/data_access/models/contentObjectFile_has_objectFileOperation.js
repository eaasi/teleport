'use strict';

const Sequelize = require('sequelize');

class ContentObjectFileHasObjectFileOperation extends Sequelize.Model {}
module.exports = (sequelize) => {
	ContentObjectFileHasObjectFileOperation.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		contentObjectFile_contentObjectID: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		contentObjectFile_fileID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'contentObject_has_objectFile',
				key: 'contentObjectFileID'
			}
		},
		contentObjectFile_operationID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'objectFileOperation',
				key: 'operationID'
			}
		},
		contentObjectFile_operationOrder: {
			type: Sequelize.INTEGER,
			allowNull: true
		}
	}, { sequelize, tableName: 'contentObjectFile_has_objectFileOperation' });
	ContentObjectFileHasObjectFileOperation.associate = models => {
		models.ContentObjectFileHasObjectFileOperation.hasOne(models.ContentObjectHasObjectFile, {foreignKey: 'contentObjectFileID'});
		models.ContentObjectFileHasObjectFileOperation.hasOne(models.ObjectFileOperation, {foreignKey: 'operationID'});
	};
	return ContentObjectFileHasObjectFileOperation;
};
