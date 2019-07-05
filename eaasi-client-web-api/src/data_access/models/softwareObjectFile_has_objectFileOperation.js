'use strict';

import {SoftwareObjectHasObjectFile} from './softwareObject_has_objectFile';

const Sequelize = require('sequelize');

class SoftwareObjectFileHasObjectFileOperation extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			softwareObjectFile_softwareObjectID: {
				type: Sequelize.INTEGER,
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
	};

	static associate(models) {
		SoftwareObjectFileHasObjectFileOperation.hasOne(
			SoftwareObjectHasObjectFile, {foreignKey: 'softwareObjectFileID'});
	}
}

module.exports = {
	SoftwareObjectFileHasObjectFileOperation : SoftwareObjectFileHasObjectFileOperation
};
