'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('file_format_has_mime_type', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			fileFormat_fileFormatID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'file_format',
					key: 'id'
				}
			},
			fileFormat_mimeTypeLabel: {
				type: Sq.STRING,
				allowNull: false,
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('file_format_has_mime_type');
	}
};
