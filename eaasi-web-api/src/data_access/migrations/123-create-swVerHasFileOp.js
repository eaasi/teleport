'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('software_version_has_file_operation', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareVersion_softwareVersionID: {
				type: Sq.STRING,
				references: {
					model: 'software_version',
					key: 'id'
				}
			},
			softwareVersion_fileOperationID: {
				type: Sq.STRING,
				references: {
					model: 'file_operation',
					key: 'id'
				}
			},
			softwareVersion_operationType: {
				type: Sq.STRING,
			},
			defaultOperation: {
				type: Sq.BOOLEAN,
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('software_version_has_file_operation');

	}
};
