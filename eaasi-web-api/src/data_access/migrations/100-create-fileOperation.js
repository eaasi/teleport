'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('file_operation', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			fileOperationID: {
				type: Sq.STRING,
				allowNull: false,
				primaryKey: true,
			},
			fileOperationText: {
				type: Sq.STRING,
				allowNull: true
			},
			associatedMimeTypeQid: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'mime_type',
					key: 'qid'
				}
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('file_operation');
	}
};
