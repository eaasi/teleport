'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('file_operation_nearest_file_format', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			fileOperationID: {
				type: Sq.INTEGER,
				allowNull: true
			},
			fileFormatID: {
				type: Sq.STRING(64),
				allowNull: true,
				references: {
					model: 'file_format',
				}
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('file_operation_nearest_file_format');
	}
};
