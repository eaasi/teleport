'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('file_operation_has_file_extension', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			fileOperation_fileOperationID: {
				type: Sq.STRING,
				allowNull: true
			},
			fileOperation_fileExtensionID: {
				type: Sq.INTEGER,
				allowNull: true
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('file_operation_has_file_extension');
	}
};
