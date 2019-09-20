'use strict';

const Sequelize = require('sequelize');

class FileFormatHasFileExtension extends Sequelize.Model {}

module.exports = (sequelize) => {
	FileFormatHasFileExtension.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		fileFormat_fileFormatID: {
			type: Sequelize.STRING,
			allowNull: false,
			references: {
				model: 'fileFormat',
				key: 'fileFormatID'
			}
		},
		fileExtension_fileExtensionID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'fileExtension',
				key: 'fileExtensionID'
			}
		}
	}, { sequelize, tableName: 'fileFormat_has_fileExtension' });
	FileFormatHasFileExtension.associate = models => {

		models.FileFormatHasFileExtension.hasOne(models.FileFormat, {foreignKey: 'fileFormatID'});
		models.FileFormatHasFileExtension.hasOne(models.FileExtension, {foreignKey: 'fileExtensionID'});
	};
	return FileFormatHasFileExtension;
};
