'use strict';

const Sequelize = require('sequelize');

class FileFormat extends Sequelize.Model {}
module.exports = (sequelize) => {
	FileFormat.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		fileFormatID: {
			type: Sequelize.STRING,
			allowNull: true,
			primaryKey: true
		},
		fileFormatQID: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		fileFormatLabel: {
			type: Sequelize.STRING,
			allowNull: true
		},
	}, { sequelize, tableName: 'fileFormat' });
	return FileFormat;
};
