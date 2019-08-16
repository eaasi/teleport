'use strict';

const Sequelize = require('sequelize');

class DigitalObjectFileHasObjectFileOperation extends Sequelize.Model {}
module.exports = (sequelize) => {
	DigitalObjectFileHasObjectFileOperation.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		digitalObjectFile_digitalObjectID: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		digitalObjectFile_fileID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'digitalObject_has_objectFile',
				key: 'digitalObjectFileID'
			}
		},
		digitalObjectFile_operationID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'objectFileOperation',
				key: 'operationID'
			}
		},
		digitalObjectFile_operationOrder: {
			type: Sequelize.INTEGER,
			allowNull: true
		}
	}, { sequelize, tableName: 'digitalObjectFile_has_objectFileOperation' });
	DigitalObjectFileHasObjectFileOperation.associate = models => {
		models.DigitalObjectFileHasObjectFileOperation.hasOne(models.DigitalObjectHasObjectFile, {foreignKey: 'digitalObjectFileID'});
		models.DigitalObjectFileHasObjectFileOperation.hasOne(models.ObjectFileOperation, {foreignKey: 'operationID'});
	};
	return DigitalObjectFileHasObjectFileOperation;
};
