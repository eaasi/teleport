'use strict';

const Sequelize = require('sequelize');

class FormatImplementation extends Sequelize.Model {}

module.exports = (sequelize) => {
	FormatImplementation.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		formatImplementationID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		formatImplementationName: {
			type: Sequelize.STRING,
			allowNull: false
		},
		implementationExtension: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'fileExtension',
				key: 'fileExtensionID'
			}
		}
	}, { sequelize, tableName: 'formatImplementation' });
	FormatImplementation.associate = models => {
		models.FormatImplementation.hasOne(models.FileExtension, {foreignKey: 'fileExtensionID'});
	};
	return FormatImplementation;
};
