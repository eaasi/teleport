'use strict';

const Sequelize = require('sequelize');

class SoftwareVersionHasFormatImplementation extends Sequelize.Model {}
module.exports = (sequelize) => {
	SoftwareVersionHasFormatImplementation.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		softwareVersion_softwareVersionID: {
			type: Sequelize.STRING,
			allowNull: false,
			references: {
				model: 'softwareVersion',
				key: 'softwareVersionID'
			}
		},
		softwareVersion_formatImplementationID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'formatImplementation',
				key: 'formatImplementationID'
			}
		},
		softwareVersion_implementationOperation: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'formatOperation',
				key: 'operationID'
			}
		},
		defaultImplementation: {
			type: Sequelize.BOOLEAN,
			allowNull: true
		}
	}, { sequelize, tableName: 'pointerDevice' });
	SoftwareVersionHasFormatImplementation.associate = models => {
		models.SoftwareVersionHasFormatImplementation.hasOne(models.SoftwareVersion, {foreignKey: 'softwareVersionID'});
		models.SoftwareVersionHasFormatImplementation.hasOne(models.FormatImplementation, {foreignKey: 'formatImplementationID'});
		models.SoftwareVersionHasFormatImplementation.hasOne(models.FormatOperation, {foreignKey: 'formatOperationID'});
	};
	return SoftwareVersionHasFormatImplementation;
};
