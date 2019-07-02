'use strict';

const Sequelize = require('sequelize');

class FileExtension extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			fileExtensionID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			extension: {
				type: Sequelize.STRING,
				allowNull: false
			}
		}, { sequelize, tableName: 'fileExtension' });
	};

	static associate(models) {
	}
}

module.exports = {
	FileExtension: FileExtension
};
