'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('file_format_has_mime_type', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			fileFormatQid: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'file_format',
					key: 'qid'
				}
			},
			mimeTypeQid: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'mime_type',
					key: 'qid'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('file_format_has_mime_type');
	}
};
