'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('software_version_has_file_operation', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareVersionID: {
				type: Sq.INTEGER,
				references: {
					model: 'software_version',
					key: 'id'
				}
			},
			fileOperationID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'file_operation',
					key: 'id'
				}
			},
			fileOperationType: {
				type: Sq.STRING,
				allowNull: true
			},
			isDefaultOperation: {
				type: Sq.BOOLEAN,
				allowNull: false,
				defaultValue: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('software_version_has_file_operation');
	}
};
