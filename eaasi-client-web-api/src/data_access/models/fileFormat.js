'use strict';

const Sequelize = require('sequelize');

class FileFormat extends Sequelize.Model {}
module.exports = (sequelize) => {
	FileFormat.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		fileFormatQID: {
			type: Sequelize.STRING,
			allowNull: false,
			primaryKey: true
		},
		fileFormatName: {
			type: Sequelize.STRING,
			allowNull: true
		},
		pronomID: {
			type: Sequelize.STRING,
			allowNull: true
		}
	}, { sequelize, tableName: 'fileFormat' });
	return FileFormat;
};
