'use strict';

const Sequelize = require('sequelize');

class SoftwareObjectFileHasObjectFileOperation extends Sequelize.Model {}
module.exports = (sequelize) => {
	SoftwareObjectFileHasObjectFileOperation.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		softwareObjectFile_softwareObjectID: {
			type: Sequelize.STRING,
			allowNull: false,
			references: {
				model: 'softwareObject_has_objectFile',
				key: 'softwareObjectFileID'
			}
		},
		softwareObjectFile_fileID: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		softwareObjectFile_operationID: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		softwareObjectFile_operationOrder: {
			type: Sequelize.INTEGER,
			allowNull: true
		}
	}, { sequelize, tableName: 'softwareObjectFile_has_objectFileOperation' });

	SoftwareObjectFileHasObjectFileOperation.associate = models => {
		models.SoftwareObjectFileHasObjectFileOperation.hasOne(
			models.SoftwareObjectHasObjectFile, {foreignKey: 'softwareObjectFileID'});
	};
	return SoftwareObjectFileHasObjectFileOperation;
};
