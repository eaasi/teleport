'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('file_format_has_file_extension', {
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			fileFormatQid: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'file_format',
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
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('file_format_has_file_extension');
	}
};
