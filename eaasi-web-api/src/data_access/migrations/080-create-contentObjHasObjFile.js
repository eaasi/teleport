'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('content_object_has_object_file', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			contentObject_contentObjectLocalID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'content_object',
					key: 'id'
				}
			},
			contentObjectFileID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'file',
					key: 'id'
				}
			},
			contentObjectFileLabel: {
				type: Sq.STRING,
				allowNull: true
			},
			contentObjectFile_mediaTypeName: {
				type: Sq.STRING,
				allowNull: true
			},
			contentObjectFile_order: {
				type: Sq.INTEGER,
				allowNull: true
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('content_object_has_object_file');
	}
};
