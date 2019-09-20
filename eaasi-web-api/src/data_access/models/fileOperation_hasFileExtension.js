'use strict';

const Sequelize = require('sequelize');

class FileOperationHasFileExtension extends Sequelize.Model {}

module.exports = (sequelize) => {
	FileOperationHasFileExtension.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		fileOperation_fileOperationID: {
			type: Sequelize.STRING,
			allowNull: true
		},
		fileOperation_fileExtensionID: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
	}, { sequelize, tableName: 'fileOperationHasFileExtension' });
	return FileOperationHasFileExtension;
};
