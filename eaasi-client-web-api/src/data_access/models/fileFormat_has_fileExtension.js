'use strict';

import {FileFormat} from './fileFormat';
import {FileExtension} from './fileExtension';

const Sequelize = require('sequelize');

class FileFormatHasFileExtension extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			fileFormat_fileFormatQID: {
				type: Sequelize.STRING,
				allowNull: false,
				references: {
					model: 'fileFormat',
					key: 'fileFormatQID'
				}
			},
			fileExtension_fileExtensionID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'fileExtension',
					key: 'fileExtensionID'
				}
			}
		}, { sequelize, tableName: 'fileFormat_has_fileExtension' });
	};

	static associate(models) {
		FileFormatHasFileExtension.hasOne(FileFormat, {foreignKey:'fileFormatQID'});
		FileFormatHasFileExtension.hasOne(FileExtension, {foreignKey:'fileExtensionID'});
	}
}

module.exports = {
	FileFormatHasFileExtension: FileFormatHasFileExtension
};
