'use strict';

import {DigitalObjectHasObjectFile} from './digitalObject_has_objectFile';
import {ObjectFileOperation} from './objectFileOperation';

const Sequelize = require('sequelize');

class DigitalObjectFileHasObjectFileOperation extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
	};

	static associate(models) {
		DigitalObjectFileHasObjectFileOperation.hasOne(DigitalObjectHasObjectFile, {foreignKey: 'digitalObjectFileID'});
		DigitalObjectFileHasObjectFileOperation.hasOne(ObjectFileOperation, {foreignKey: 'operationID'});
	}
}

module.exports = {
	DigitalObjectFileHasObjectFileOperation: DigitalObjectFileHasObjectFileOperation
};
