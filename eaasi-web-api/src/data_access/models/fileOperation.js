'use strict';

const Sequelize = require('sequelize');

class FileOperation extends Sequelize.Model {}

module.exports = (sequelize) => {
	FileOperation.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		fileOperationID: {
			type: Sequelize.STRING,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		fileOperationText: {
			type: Sequelize.STRING,
			allowNull: true
		},
		associatedMIMEType: {
			type: Sequelize.STRING,
			allowNull: true
		},
	}, { sequelize, tableName: 'file' });
	return FileOperation;
};
