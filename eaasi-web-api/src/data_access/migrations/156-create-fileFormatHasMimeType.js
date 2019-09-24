'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('fileFormat_has_mimeType', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			fileFormat_fileFormatID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'fileFormat',
					key: 'fileFormatID'
				}
			},
			fileFormat_mimeTypeLabel: {
				type: Sq.STRING,
				allowNull: false,
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('fileFormat_has_mimeType');
	}
};
