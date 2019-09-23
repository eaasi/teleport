'use strict';

const Sequelize = require('sequelize');

class FileFormatHasMimeType extends Sequelize.Model {}

module.exports = (sequelize) => {
	FileFormatHasMimeType.init({
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
		fileFormat_mimeTypeLabel: {
			type: Sequelize.STRING,
			allowNull: false,
			references: {
				model: 'mimeType',
				key: 'mimeTypeID'
			}
		}
	}, { sequelize, tableName: 'fileFormat_has_mimeType' });
	return FileFormatHasMimeType;
};
