'use strict';

const Sequelize = require('sequelize');

class SoftwareVersionHasFileOperation extends Sequelize.Model {}
module.exports = (sequelize) => {
	SoftwareVersionHasFileOperation.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		softwareVersion_softwareVersionID: {
			type: Sequelize.INTEGER,
			references: {
				model: 'softwareVersion',
				key: 'softwareVersionID'
			}
		},
		softwareVersion_fileOperationID: {
			type: Sequelize.INTEGER,
			references: {
				model: 'fileOperation',
				key: 'fileOperationID'
			}
		},
		softwareVersion_operationType: {
			type: Sequelize.INTEGER,
		},
		defaultOperation: {
			type: Sequelize.BOOLEAN,
		}
	}, { sequelize, tableName: 'softwareVersion_has_fileOperation' });
	return SoftwareVersionHasFileOperation;
};
