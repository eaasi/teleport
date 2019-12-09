'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('file_operation', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			id: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			label: {
				type: Sq.STRING(128),
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
