'use strict';

const Sequelize = require('sequelize');

class FileSystem extends Sequelize.Model {}

module.exports = (sequelize) => {
	FileSystem.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		fileSystemQID: {
			type: Sequelize.STRING,
			allowNull: false,
			primaryKey: true
		},
		fileSystemName: {
			type: Sequelize.INTEGER,
			allowNull: false
		}
	}, { sequelize, tableName: 'fileSystem' });
	return FileSystem;
};
