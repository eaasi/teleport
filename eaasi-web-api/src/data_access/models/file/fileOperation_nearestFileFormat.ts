'use strict';

const Sequelize = require('sequelize');

class FileOperationNearestFileFormat extends Sequelize.Model {}

module.exports = (sequelize) => {
	FileOperationNearestFileFormat.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		fileOperation_fileOperationID: {
			type: Sequelize.STRING,
			allowNull: true
		},
		fileOperation_fileFormatID: {
			type: Sequelize.STRING,
			allowNull: true
		},
	}, { sequelize, tableName: 'fileOperation_nearestFileFormat' });
	return FileOperationNearestFileFormat;
};
