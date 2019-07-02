'use strict';

const Sequelize = require('sequelize');

export default class FileSystem extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
	};

	static associate(models) {
	}
}
