'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('softwareVersion_has_fileOperation', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareVersion_softwareVersionID: {
				type: Sq.INTEGER,
				references: {
					model: 'softwareVersion',
					key: 'softwareVersionID'
				}
			},
			softwareVersion_fileOperationID: {
				type: Sq.STRING,
				references: {
					model: 'fileOperation',
					key: 'fileOperationID'
				}
			},
			softwareVersion_operationType: {
				type: Sq.INTEGER,
			},
			defaultOperation: {
				type: Sq.BOOLEAN,
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('softwareVersion_has_fileOperation');

	}
};
