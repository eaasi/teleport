'use strict';

const Sequelize = require('sequelize');

export default class FileExtension extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
