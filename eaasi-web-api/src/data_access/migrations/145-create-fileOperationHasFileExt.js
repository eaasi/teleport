'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('file_operation_has_file_extension', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			fileOperationID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'file_operation',
					key: 'id'
				}
			},
			fileExtensionID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'file_extension',
					key: 'id'
				}
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('file_operation_has_file_extension');
	}
};
