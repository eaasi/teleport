'use strict';

const Sequelize = require('sequelize');

class FileSystem extends Sequelize.Model {
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

module.exports = {
	FileSystem: FileSystem
};
