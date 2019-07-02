'use strict';

import {FileFormat} from './fileFormat';

const Sequelize = require('sequelize');

class File extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			fileID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			fileLocation: {
				type: Sequelize.STRING,
				allowNull: true
			},
			fileName: {
				type: Sequelize.STRING,
				allowNull: true
			},
			fileChecksum: {
				type: Sequelize.STRING,
				allowNull: true
			},
			fileFormat: {
				type: Sequelize.STRING,
				allowNull: true,
				references: {
					model: 'fileFormat',
					key: 'fileFormatQID'
				}
			},
			fileSize: {
				type: Sequelize.STRING,
				allowNull: true
			}
		}, { sequelize, tableName: 'file' });
	};

	static associate(models) {
		File.hasOne(FileFormat, {foreignKey: 'fileFormatQID'});
	}
}

module.exports = {
	File: File
};
