'use strict';

const Sequelize = require('sequelize');

class FileSystem extends Sequelize.Model {}

module.exports = (sequelize) => {
	FileSystem.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		fileSystemID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		fileSystemQID: {
			allowNull: false,
			primaryKey: true
		},
		fileSystemLabel: {
			type: Sequelize.STRING,
			allowNull: false
		}
	}, { sequelize, tableName: 'fileSystem' });
	return FileSystem;
};
