'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('file_operation_nearest_file_format', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			fileOperationID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'file_operation',
					key: 'id'
				}
			},
			fileFormatID: {
				type: Sq.STRING(64),
				allowNull: true,
				references: {
					model: 'file_format',
					key: 'qid'
				}
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('file_operation_nearest_file_format');
	}
};
