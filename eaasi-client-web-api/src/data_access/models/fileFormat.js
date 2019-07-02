'use strict';

const Sequelize = require('sequelize');

class FileFormat extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
	};

	static associate(models) {
	}
}

module.exports = {
	FileFormat: FileFormat
};
