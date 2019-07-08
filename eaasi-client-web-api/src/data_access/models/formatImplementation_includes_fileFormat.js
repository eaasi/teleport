'use strict';

const Sequelize = require('sequelize');

class FormatImplementationIncludesFileFormat extends Sequelize.Model {}
	module.exports = (sequelize) => {
	FormatImplementationIncludesFileFormat.init({
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
	FormatImplementationIncludesFileFormat.associate = models => {
		models.FormatImplementationIncludesFileFormat.hasOne(models.FileFormat, {foreignKey: 'fileFormatQID'});
		models.FormatImplementationIncludesFileFormat.hasOne(models.FormatImplementation, {foreignKey: 'formatImplementationID'});
	};
	return FormatImplementationIncludesFileFormat;
}
