'use strict';

import {FileFormat} from './fileFormat';
import {FormatImplementation} from './formatImplementation';

const Sequelize = require('sequelize');

class FormatImplementationIncludesFileFormat extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			formatImplementation_formatImplementationID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'formatImplementation',
					key: 'formatImplementationID'
				}
			},
			fileFormat_fileFormatQID: {
				type: Sequelize.STRING,
				allowNull: false,
				references: {
					model: 'fileFormat',
					key: 'fileFormatQID'
				}
			}
		}, { sequelize, tableName: 'formatImplementation_includes_fileFormat' });
	};

	static associate(models) {
		FormatImplementationIncludesFileFormat.hasOne(FileFormat, {foreignKey: 'fileFormatQID'});
		FormatImplementationIncludesFileFormat.hasOne(FormatImplementation, {foreignKey: 'formatImplementationID'});
	}
}

module.exports = {
	FormatImplementationIncludesFileFormat: FormatImplementationIncludesFileFormat
};
